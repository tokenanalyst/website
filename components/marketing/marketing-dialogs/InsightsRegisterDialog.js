import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

import { SimpleDialog } from '../../SimpleDialog';
import { LoginContext } from '../../../contexts/Login';

export const InsightsRegisterDialog = ({ isOpen, closeCb }) => {
  const loginCtx = useContext(LoginContext);
  const router = useRouter();

  return (
    <SimpleDialog
      header="Sign Up for FREE Access to this Insight and many more!"
      ctaText="Sign Up"
      isOpen={isOpen}
      onClose={() => {
        ReactGA.event({
          category: 'User',
          action: `Metrics Page Dialog Dismissed`,
          label: `Funnel`,
        });
        closeCb();
      }}
      onCtaClick={() => {
        loginCtx.setPostRegisterViaMetricsRedirectUrl('/insights');
        ReactGA.event({
          category: 'User',
          action: `Metrics Page Dialog Sign Up Clicked`,
          label: `Funnel`,
        });
        router.push('/register?metrics=true');
      }}
    >
      <br />
      TokenAnalyst provides a World Class amount of Insights across all major
      Tokens and Blockchains. <br />
      By signing up you will have access to all Insights, in both daily and
      hourly granularities (depending on specific Insights).
    </SimpleDialog>
  );
};
