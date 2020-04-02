import { redirectToStripe } from './redirectToStripe';
import { sendToPagerDuty } from './sendToPagerDuty';

jest.mock('./sendToPagerDuty');

describe('redirectToStripe function', () => {
  it('should send alert to pagerDuty on error', async () => {
    global.Stripe = jest.fn().mockReturnValue({
      redirectToCheckout: async () => {
        throw new Error('Stripe error');
      },
    });

    const redirectF = redirectToStripe('key', 'product');
    await redirectF({});

    expect(sendToPagerDuty).toHaveBeenCalledWith(
      'e8048d9c3211488caa16e1bd2cad3e03',
      'error',
      'FE Stripe',
      'Stripe error'
    );
  });
});
