import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ExchangeFlowsPage } from '../../../components/atomic/pages/ExchangeFlows';
import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { LoginContext } from '../../../contexts/Login';
import { DelayedExchangeRegisterDialog } from '../../../components/marketing/marketing-dialogs';
import {
  LOGGED_OUT_SUPPORTED_EXCHANGES,
  BINANCE,
} from '../../../constants/exchanges';
import { MinerStatsPage } from '../../../components/atomic/pages/MinerStats';

const isLoginRequiredToAccessExchange = exchange =>
  LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchange) < 0;

const Miner = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, miner } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);

  // useEffect(() => {
  //   if (
  //     exchange &&
  //     !loginCtx.isLoggedIn &&
  //     LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchange) < 0
  //   ) {
  //     router.push('/');
  //   }
  //   const exchangeSupport = tokensDb.getTokenSupportForExchange(token, exchange);
  //   if (exchangeSupport) {
  //     setIsTVSupported(true);
  //   }
  // }, [token, exchange, loginCtx.isLoggedIn, router]);

  // const pushToPage = (newToken, newExchange) => {
  //   const exchangeSupport = tokensDb.getTokenSupportForExchange(
  //     newToken,
  //     newExchange
  //   );

  //   if (exchangeSupport) {
  //     return router.push(
  //       `/exchange/[token]/[exchange]`,
  //       `/exchange/${newToken}/${newExchange}?tier=${Cookies.get(COOKIES.tier)}`
  //     );
  //   }
  //   const tokensList = tokensDb.getTokensList('all', newExchange);

  //   const defaultToken = Object.keys(tokensList)[0];

  //   return router.push(
  //     `/exchange/[token]/[exchange]`,
  //     `/exchange/${defaultToken}/${newExchange}?tier=${Cookies.get(
  //       COOKIES.tier
  //     )}`
  //   );
  // };

  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Miners statistics</title>
      </Head>
      <div className="container">
        {!Cookies.get(COOKIES.hasSeenRegisterDialog) &&
          !loginCtx.isLoggedIn && <DelayedExchangeRegisterDialog />}
        {token && miner ? (
          <>
            <MinerStatsPage
              selectedMiner={miner}
              selectedExchange={BINANCE}
              selectedToken={token}
              tokensDb={tokensDb}
              // onChangeToken={pushToPage}
            />
          </>
        ) : (
          token &&
          miner && (
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

export default Miner;
