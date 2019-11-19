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
    successUrl: `https://www.tokenanalyst.io/purchase-success${
      product ? `?p=${product.toLowerCase()}` : ''
    }`,
    cancelUrl: 'https://www.tokenanalyst.io/',
    ...stripeOptions,
  };

  await stripe.redirectToCheckout(stripeOpt);
};
