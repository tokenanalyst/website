import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ReactGA from 'react-ga';
import { useRouter } from 'next/router';

import { SimpleDialog } from '../../atoms/SimpleDialog/SimpleDialog';
import { LoginContext } from '../../../../contexts/Login';

const DialogText = ({ children }) => (
  <>
    <div className="text">{children}</div>
    <style jsx>
      {`
        .text {
          line-height: 1.5em;
          font-size: 16px;
        }
      `}
    </style>
  </>
);
DialogText.propTypes = {
  children: PropTypes.node.isRequired,
};

export const InsightsRegisterDialog = ({ isOpen, onClose }) => {
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
        onClose();
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
      <DialogText>
        <p>
          TokenAnalyst provides a World Class amount of Insights across all
          major Tokens and Blockchains.
        </p>
        <p>
          By signing up you will have access to all Insights, in both daily and
          hourly granularities (depending on specific Insights).
        </p>
      </DialogText>
    </SimpleDialog>
  );
};

InsightsRegisterDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
