const { stripe, PRICE_IDS, COUPONS } = require('../config/stripe');
const { supabase } = require('../config/supabase');

class SubscriptionController {
  async createSubscription(req, res) {
    try {
      const { priceId, email, name, couponCode } = req.body;

      // Validazione
      if (!priceId || !email) {
        return res.status(400).json({
          error: 'Missing required fields: priceId, email',
        });
      }

      // 1. Cerca o crea customer
      let customer;
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        // Aggiorna nome se fornito
        if (name) {
          await stripe.customers.update(customer.id, { name });
        }
      } else {
        customer = await stripe.customers.create({
          email,
          name: name || email.split('@')[0],
          metadata: {
            source: 'consciuslabs_website',
          },
        });
      }

      // 2. Prepara subscription options
      const subscriptionOptions = {
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          plan: priceId,
          email,
        },
      };

      // 3. Applica coupon se fornito
      if (couponCode && COUPONS[couponCode.toUpperCase()]) {
        subscriptionOptions.coupon = COUPONS[couponCode.toUpperCase()];
      }

      // 4. Crea subscription
      const subscription = await stripe.subscriptions.create(subscriptionOptions);

      // 5. Salva nel database Supabase
      const { error: dbError } = await supabase
        .from('subscriptions')
        .insert([
          {
            stripe_subscription_id: subscription.id,
            stripe_customer_id: customer.id,
            email: email,
            name: name || '',
            price_id: priceId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000),
            current_period_end: new Date(subscription.current_period_end * 1000),
            created_at: new Date(),
          },
        ]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        // Non blocchiamo la risposta, ma logghiamo l'errore
      }

      // 6. Ritorna client secret per il frontend
      const clientSecret = subscription.latest_invoice.payment_intent.client_secret;

      res.json({
        clientSecret,
        subscriptionId: subscription.id,
        customerId: customer.id,
        status: subscription.status,
      });
    } catch (error) {
      console.error('Create subscription error:', error);
      res.status(500).json({
        error: error.message || 'Failed to create subscription',
      });
    }
  }

  async getSubscription(req, res) {
    try {
      const { subscriptionId } = req.params;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      res.json({
        id: subscription.id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
      });
    } catch (error) {
      console.error('Get subscription error:', error);
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async cancelSubscription(req, res) {
    try {
      const { subscriptionId } = req.params;

      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      // Aggiorna database
      await supabase
        .from('subscriptions')
        .update({
          cancel_at_period_end: true,
          updated_at: new Date(),
        })
        .eq('stripe_subscription_id', subscriptionId);

      res.json({
        id: subscription.id,
        status: subscription.status,
        cancel_at_period_end: subscription.cancel_at_period_end,
      });
    } catch (error) {
      console.error('Cancel subscription error:', error);
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

module.exports = new SubscriptionController();
