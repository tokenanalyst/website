import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

import { SimpleDialog } from '../../SimpleDialog';
import { LoginContext } from '../../../contexts/Login';

export const ExchangeRegisterDialog = ({ isOpen, closeCb }) => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();

  return (
    <SimpleDialog
      header="Sign Up for FREE Access to this Exchange and many more!"
      ctaText="Sign Up"
      isOpen={isOpen}
      onClose={() => {
        ReactGA.event({
          category: 'User',
          action: `Exchange Page Extra Exchanges Dialog Closed`,
          label: `Funnel`,
        });
        closeCb();
      }}
      onCtaClick={() => {
        loginCtx.setPostRegisterRedirectUrl(router.asPath.split('?')[0]);
        ReactGA.event({
          category: 'User',
          action: `Exchange Page Extra Exchanges Dialog Sign Up Clicked`,
          label: `Funnel`,
        });
        router.push('/register?exchange=true');
      }}
    >
      <br />
      TokenAnalyst provides a World Class amount of Exchange Flows across all
      major exchanges. <br />
      By signing up you will have access to all exchanges, as well as an
      unparalleled amount of metrics across the major blockchains.
    </SimpleDialog>
  );
};
