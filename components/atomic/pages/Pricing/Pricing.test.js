import React from 'react';
import { mount } from 'enzyme';

import { redirectToStripe } from '../../../../utils';
import { PricingPage } from './Pricing';

jest.mock('../../../../utils');
redirectToStripe.mockReturnValue(() => {});

describe('Pricing component', () => {
  it('simulates click events', () => {
    const wrapper = mount(<PricingPage />);
    wrapper.find('button').forEach(button => {
      if (button.text() === 'Buy Plan') {
        button.simulate('click');
        expect(redirectToStripe).toHaveBeenCalledWith(
          'plan_FZwuSdyp2hRm98',
          'Professional'
        );
      }
    });
  });
});
