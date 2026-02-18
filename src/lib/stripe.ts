import { loadStripe, Stripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51T1WwcD5yldKuDg6a7rjtFsWRefobXmMKS2NeoKlHR0CTKnwLjbsKWLPc4sDrnoVGLM3eAi8lT5mwz5SV9ONTaZo00i4rDWtKQ';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Price IDs da configurare in Stripe Dashboard
// NOTA: Questi price ID devono essere aggiornati su Stripe Dashboard con i nuovi prezzi
export const STRIPE_PRICES = {
  starter: {
    monthly: 'price_1T1X4QD5yldKuDg6jLqeCOjg',    // €147 (da aggiornare su Stripe)
    annual: 'price_1T1a2wD5yldKuDg65lFIQvsP',      // €118 (da aggiornare su Stripe)
  },
  professional: {
    monthly: 'price_1T1X4xD5yldKuDg6Csy0vbMf',        // €247 (da aggiornare su Stripe)
    annual: 'price_1T1a2WD5yldKuDg6kBaVPHUu',          // €198 (da aggiornare su Stripe)
  },
  business: {
    monthly: 'price_1T1X5LD5yldKuDg6qvGVFBD5',   // €447 (da aggiornare su Stripe)
    annual: 'price_1T1a2DD5yldKuDg60eDNa5oO',     // €358 (da aggiornare su Stripe)
  },
};

export type PlanType = 'starter' | 'professional' | 'business';
export type BillingCycle = 'monthly' | 'annual';

export const getPriceId = (plan: PlanType, cycle: BillingCycle): string => {
  return STRIPE_PRICES[plan][cycle];
};

export const PLAN_DETAILS = {
  starter: {
    name: 'Starter',
    monthly: 147,
    annual: 118,
    description: '2 asset → 15 formati',
  },
  professional: {
    name: 'Professional',
    monthly: 247,
    annual: 198,
    description: '4 asset → 30 formati',
  },
  business: {
    name: 'Business',
    monthly: 447,
    annual: 358,
    description: '8 asset → 50+ formati',
  },
};
