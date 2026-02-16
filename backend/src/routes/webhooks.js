const express = require('express');
const router = express.Router();
const { stripe } = require('../config/stripe');
const { supabase } = require('../config/supabase');

// POST /api/webhook
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gestisci eventi
  switch (event.type) {
    case 'invoice.paid':
      await handleInvoicePaid(event.data.object);
      break;

    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object);
      break;

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Handler: Invoice pagata
async function handleInvoicePaid(invoice) {
  console.log(`Invoice paid: ${invoice.id}`);
  
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      last_payment_status: 'paid',
      last_payment_date: new Date(),
      updated_at: new Date(),
    })
    .eq('stripe_subscription_id', invoice.subscription);

  if (error) {
    console.error('Error updating subscription:', error);
  }

  // TODO: Invia email di conferma al cliente
  // TODO: Attiva account nel sistema
}

// Handler: Pagamento fallito
async function handleInvoicePaymentFailed(invoice) {
  console.log(`Invoice payment failed: ${invoice.id}`);
  
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      last_payment_status: 'failed',
      updated_at: new Date(),
    })
    .eq('stripe_subscription_id', invoice.subscription);

  if (error) {
    console.error('Error updating subscription:', error);
  }

  // TODO: Invia email di notifica al cliente
  // TODO: Retry logic o suspend account
}

// Handler: Subscription aggiornata
async function handleSubscriptionUpdated(subscription) {
  console.log(`Subscription updated: ${subscription.id}`);
  
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
  }
}

// Handler: Subscription cancellata
async function handleSubscriptionDeleted(subscription) {
  console.log(`Subscription deleted: ${subscription.id}`);
  
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      updated_at: new Date(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
  }

  // TODO: Disattiva account nel sistema
}

module.exports = router;
