/* eslint-disable no-undef */
import { STRIPE_KEY } from '../constants/stripe';
import { sendToPagerDuty } from './sendToPagerDuty';
import { PD } from '../constants/pagerDuty';

export const redirectToStripe = (
  stripePlan,
  product
) => async stripeOptions => {
  try {
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
  } catch (err) {
    const { serviceKey, severity } = PD;

    sendToPagerDuty(serviceKey, severity[3], 'FE Stripe', err.message);
  }
};
