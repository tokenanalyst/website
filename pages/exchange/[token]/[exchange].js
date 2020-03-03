import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeFlowsPage } from '../../../components/atomic/pages/ExchangeFlows';
import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { LoginContext } from '../../../contexts/Login';
import { DelayedExchangeRegisterDialog } from '../../../components/atomic/organism/DelayedExchangeRegisterDialog';
import { isLoginRequiredToAccessEntity } from '../../../utils';

const Exchange = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, exchange } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);

  useEffect(() => {
    if (
      exchange &&
      !loginCtx.isLoggedIn &&
      isLoginRequiredToAccessEntity(exchange)
    ) {
      router.push('/');
    }
    const exchangeSupport = tokensDb.getTokenSupportForExchange(
      token,
      exchange
    );
    if (exchangeSupport) {
      setIsTVSupported(true);
    }
  }, [token, exchange, loginCtx.isLoggedIn, router]);

  const pushToPage = (newToken, newExchange) => {
    const exchangeSupport = tokensDb.getTokenSupportForExchange(
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
    <>
      <Head>
        <title key="title">TokenAnalyst - Inflows and Outflows</title>
      </Head>
      <div className="container">
        {!Cookies.get(COOKIES.hasSeenRegisterDialog) &&
          !loginCtx.isLoggedIn && <DelayedExchangeRegisterDialog />}
        {token && exchange && isTVSupported ? (
          <>
            <ExchangeFlowsPage
              selectedExchange={exchange}
              selectedToken={token}
              tokensDb={tokensDb}
              onChangeToken={pushToPage}
            />
          </>
        ) : (
          token &&
          exchange && (
            <div>This combination of token and miner is not supported.</div>
          )
        )}
      </div>
      <style jsx>
        {`
          .container {
            margin-right: 10px;
            margin-left: 10px;
          }
        `}
      </style>
    </>
  );
};

export default Exchange;
