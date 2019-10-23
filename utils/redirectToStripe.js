import { STRIPE } from '../constants/stripe';

export const redirectToStripe = (
  stripePlan,
  product
) => async stripeOptions => {
  const stripe = Stripe(STRIPE.apiTestKey);

  const stripeOpt = {
    items: [
      {
        plan: 'plan_F7W6tgvMEc0yRM',
        quantity: 1,
      },
    ],
    successUrl: `https://www.tokenanalyst.io/purchase-success${
      product ? `?p=${product.toLowerCase()}` : ''
    }`,
    cancelUrl: 'https://www.tokenanalyst.io/',
    ...stripeOptions,
  };

  await stripe.redirectToCheckout(stripeOpt);
};
