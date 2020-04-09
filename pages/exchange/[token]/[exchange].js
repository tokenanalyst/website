import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { LoginContext } from '../../../contexts/Login';
import { DelayedExchangeRegisterDialog } from '../../../components/atomic/organism/DelayedExchangeRegisterDialog';
import { ExchangeStatsPage } from '../../../components/atomic/pages/ExchangeStats';
import { isLoginRequiredToAccessEntity } from '../../../utils';
import { LoadingSpinner } from '../../../components/atomic/atoms/LoadSpinner';

const Exchange = () => {

  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, exchange } = router.query;
  const supportedExchanges = tokensDb.getExchangesList();
  const [
    isTokenSupportedForExchange,
    setIsTokenSupportedForExchange,
  ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token && exchange && supportedExchanges) {
      setIsLoading(false);
    }
  }, [exchange, supportedExchanges, token]);

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
      setIsTokenSupportedForExchange(true);
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

        {isLoading && (
          <div className="loading-spinner">
            <LoadingSpinner />
          </div>
        )}

        {token &&
        exchange &&
        supportedExchanges &&
        isTokenSupportedForExchange ? (
          <>
            <ExchangeStatsPage
              selectedExchange={exchange}
              selectedToken={token}
              supportedExchanges={supportedExchanges}
              tokensDb={tokensDb}
              onChangeToken={pushToPage}
            />
          </>
        ) : (
          token &&
          exchange && (
            <div className="no-support">
              <div>
                <p>
                  This combination of token and exchange is not currently
                  supported.
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <style jsx>
        {`
          .container {
            margin-right: 10px;
            margin-left: 10px;
            height: calc(100vh - 130px);
          }
          .loading-spinner {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .no-support {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
};

export default Exchange;
