import { STRIPE } from '../constants/stripe';

export const redirectToStripe = (
  stripePlan,
  product
) => async stripeOptions => {
  const stripe = Stripe(STRIPE.apiKey);

  const stripeOpt = {
    items: [
      {
        plan: stripePlan,
        quantity: 1,
      },
    ],
    successUrl: `https://website-jamesrford7.tokenanalyst.now.sh/purchase-success${
      product ? `?p=${product.toLowerCase()}` : ''
    }`,
    cancelUrl: 'https://website-jamesrford7.tokenanalyst.now.sh/',
    ...stripeOptions,
  };

  await stripe.redirectToCheckout(stripeOpt);
};
