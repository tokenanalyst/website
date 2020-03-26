/* eslint-disable no-undef */
import { STRIPE_KEY } from '../constants/stripe';

export const redirectToStripe = (
  stripePlan,
  product
) => async stripeOptions => {
  const stripe = Stripe(STRIPE_KEY);

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
