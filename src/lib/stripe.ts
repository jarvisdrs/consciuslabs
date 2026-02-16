import { loadStripe, Stripe } from '@stripe/stripe-js';

const publishableKey = 'pk_test_51T1WwcD5yldKuDg6a7rjtFsWRefobXmMKS2NeoKlHR0CTKnwLjbsKWLPc4sDrnoVGLM3eAi8lT5mwz5SV9ONTaZo00i4rDWtKQ';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Price IDs da configurare in Stripe Dashboard
export const STRIPE_PRICES = {
  starter: {
    monthly: 'price_1T1X4QD5yldKuDg6jLqeCOjg',    // €297
    annual: 'price_1T1a2wD5yldKuDg65lFIQvsP',      // €237
  },
  professional: {
    monthly: 'price_1T1X4xD5yldKuDg6Csy0vbMf',        // €497
    annual: 'price_1T1a2WD5yldKuDg6kBaVPHUu',          // €397
  },
  business: {
    monthly: 'price_1T1X5LD5yldKuDg6qvGVFBD5',   // €997
    annual: 'price_1T1a2DD5yldKuDg60eDNa5oO',     // €797
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
    monthly: 297,
    annual: 237,
    description: '2 asset → 15 formati',
  },
  professional: {
    name: 'Professional',
    monthly: 497,
    annual: 397,
    description: '4 asset → 30 formati',
  },
  business: {
    name: 'Business',
    monthly: 997,
    annual: 797,
    description: '8 asset → 50+ formati',
  },
};
