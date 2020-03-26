export const STRIPE = {
  apiKey: 'pk_live_aEqZIEFOmn3PlXWWYaTnP9GE0077TbzveD',
  apiTestKey: 'pk_test_jjaNfNXAwhl1WzBigZd8qprV00Z0V4USEu',
};

export const STRIPE_KEY =
  process.env.NODE_ENV === 'development' ? STRIPE.apiTestKey : STRIPE.apiKey;
