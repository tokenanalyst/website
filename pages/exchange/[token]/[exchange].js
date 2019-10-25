import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { DelayedDialog } from '../../../components/DelayedDialog';
import { LoginContext } from '../../../contexts/Login';

const Exchange = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, exchange } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);

  useEffect(() => {
    const exchangeSupport = tokensDb.getTokenSupportOnExchange(token, exchange);
    if (exchangeSupport) {
      setIsTVSupported(true);
    }
  }, [token, exchange]);

  const pushToPage = (newToken, newExchange) => {
    const exchangeSupport = tokensDb.getTokenSupportOnExchange(
      newToken,
      newExchange
    );

    if (exchangeSupport) {
      return router.push(
        `/exchange/[token]/[exchange]`,
        `/exchange/${newToken}/${newExchange}?tier=${Cookies.get(COOKIES.tier)}`
      );
    }
    const tokensList = tokensDb.getTokensList('all', newExchange);

    const defaultToken = Object.keys(tokensList)[0];

    return router.push(
      `/exchange/[token]/[exchange]`,
      `/exchange/${defaultToken}/${newExchange}?tier=${Cookies.get(
        COOKIES.tier
      )}`
    );
  };

  return (
    <div>
      <Head>
        <title>
          {`TokenAnalyst - ${exchange} - ${token} Inflows and Outflows`}
        </title>
      </Head>

      {!Cookies.get(COOKIES.hasSeenRegisterDialog) && !loginCtx.isLoggedIn && (
        <DelayedDialog
          header="Need More Granularity?"
          subHeader="Sign up now for FREE to access TokenAnalyst charts in a 1 hour granularity across ALL tokens, exchanges and metrics!"
          timeout={25000}
          onCtaClick={() => {
            loginCtx.setPostRegisterRedirectUrl(router.asPath.split('?')[0]);
            router.push('/register?exchange=true');
            Cookies.set(COOKIES.hasSeenRegisterDialog, true);
            ReactGA.event({
              category: 'User',
              action: `Register Dialog Sign Up Clicked`,
              label: `Funnel`,
            });
          }}
          onClose={() => {
            Cookies.set(COOKIES.hasSeenRegisterDialog, true);
            ReactGA.event({
              category: 'User',
              action: `Register Dialog Dismissed`,
              label: `Funnel`,
            });
          }}
          ctaText="Sign Up"
          onDisplay={() =>
            ReactGA.event({
              category: 'User',
              action: `Register Dialog Shown`,
              label: `Funnel`,
            })
          }
        >
          <>
            <img
              src="/static/png/chart-register-desktop.png"
              className="image-desktop"
              alt="register-desktop"
            />
            <img
              src="/static/png/chart-register-mobile.png"
              className="image-mobile"
              alt="redirect-mobile"
            />
            <style jsx>
              {`
                .image-desktop {
                  width: 100%;
                  display: block;
                }
                .image-mobile {
                  display: none;
                }
                @media only screen and (max-width: 768px) {
                  .image-mobile {
                    width: 280px;
                    display: block;
                  }
                  .image-desktop {
                    display: none;
                  }
                }
              `}
            </style>
          </>
        </DelayedDialog>
      )}
      {token && exchange && isTVSupported ? (
        <>
          <ProChartWidget
            selectedExchange={exchange}
            selectedToken={token}
            tokensDb={tokensDb}
            onChange={pushToPage}
          />
        </>
      ) : (
        token &&
        exchange && (
          <>
            <ExchangeMetricsWidget token={token} exchange={exchange} />
            <IoChartWidget token={token} exchange={exchange} />
          </>
        )
      )}
    </div>
  );
};

export default Exchange;
