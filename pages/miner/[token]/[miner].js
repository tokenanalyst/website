import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

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

const TIER = `tier=${Cookies.get(COOKIES.tier)}`;

const Miner = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, miner } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState(miner);
  const [supportedMiners, setsupportedMiners] = useState();

  useEffect(() => {
    setSelectedMiner(miner);
  }, [miner]);

  useEffect(() => {
    const miners = tokensDb.getMinersList(token);
    setsupportedMiners(miners);
  }, [token]);

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
  // tokensDb.getMetricSupportForEntity().then(result => {
  //   console.log(result);
  // });

  const pushToPage = (newToken, newMiner) => {
    const miners = tokensDb.getMinersList(newToken);

    if (selectedMiner !== newMiner) {
      return router.push(
        `/miner/[token]/[miner]`,
        `/miner/${token}/${newMiner}?${TIER}`
      );
    }

    if (newToken !== token) {
      return router.push(
        `/miner/[token]/[miner]`,
        `/miner/${newToken}/${Object.keys(miners)[0]}?${TIER}`
      );
    }
  };

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
              supportedMiners={supportedMiners}
              tokensDb={tokensDb}
              onChangeToken={pushToPage}
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
