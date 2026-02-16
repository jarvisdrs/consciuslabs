const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const PRICE_IDS = {
  starter: {
    monthly: process.env.STRIPE_STARTER_MONTHLY || 'price_starter_monthly',
    annual: process.env.STRIPE_STARTER_ANNUAL || 'price_starter_annual',
  },
  professional: {
    monthly: process.env.STRIPE_PRO_MONTHLY || 'price_pro_monthly',
    annual: process.env.STRIPE_PRO_ANNUAL || 'price_pro_annual',
  },
  business: {
    monthly: process.env.STRIPE_BUSINESS_MONTHLY || 'price_business_monthly',
    annual: process.env.STRIPE_BUSINESS_ANNUAL || 'price_business_annual',
  },
};

const COUPONS = {
  FOUNDERS50: process.env.STRIPE_COUPON_FOUNDERS || 'FOUNDERS50',
};

module.exports = {
  stripe,
  PRICE_IDS,
  COUPONS,
};
