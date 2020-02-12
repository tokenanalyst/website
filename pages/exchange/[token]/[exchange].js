import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ExchangeFlows } from '../../../components/atomic/pages/ExchangeFlows';
import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { LoginContext } from '../../../contexts/Login';
import { DelayedExchangeRegisterDialog } from '../../../components/marketing/marketing-dialogs';
import { LOGGED_OUT_SUPPORTED_EXCHANGES } from '../../../constants/exchanges';

const Exchange = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, exchange } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);

  useEffect(() => {
    if (
      exchange &&
      !loginCtx.isLoggedIn &&
      LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchange) < 0
    ) {
      router.push('/');
    }
    const exchangeSupport = tokensDb.getTokenSupportOnExchange(token, exchange);
    if (exchangeSupport) {
      setIsTVSupported(true);
    }
  }, [token, exchange, loginCtx.isLoggedIn, router]);

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
        <DelayedExchangeRegisterDialog />
      )}
      {token && exchange && isTVSupported ? (
        <>
          <ExchangeFlows
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
