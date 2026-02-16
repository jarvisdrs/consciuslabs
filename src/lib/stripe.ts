import { loadStripe, Stripe } from '@stripe/stripe-js';

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

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
    monthly: 'price_starter_monthly',    // €297
    annual: 'price_starter_annual',      // €237
  },
  professional: {
    monthly: 'price_pro_monthly',        // €497
    annual: 'price_pro_annual',          // €397
  },
  business: {
    monthly: 'price_business_monthly',   // €997
    annual: 'price_business_annual',     // €797
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
