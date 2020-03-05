import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { LoginContext } from '../../../contexts/Login';
import { DelayedExchangeRegisterDialog } from '../../../components/atomic/organism/DelayedExchangeRegisterDialog';
import { BINANCE } from '../../../constants/exchanges';
import { MinerStatsPage } from '../../../components/atomic/pages/MinerStats';
import { isLoginRequiredToAccessEntity } from '../../../utils';
import { LoadingSpinner } from '../../../components/atomic/atoms/LoadSpinner';

const TIER = `tier=${Cookies.get(COOKIES.tier) || '-1'}`;

const Miner = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, miner } = router.query;
  const [selectedMiner, setSelectedMiner] = useState(miner);
  const [supportedMiners, setsupportedMiners] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (supportedMiners && Object.keys(supportedMiners).length) {
      setIsLoading(false);
    }
  }, [supportedMiners]);

  useEffect(() => {
    setSelectedMiner(miner);
  }, [miner]);

  useEffect(() => {
    const miners = tokensDb.getMinersList(token);
    setsupportedMiners(miners);
  }, [token]);

  useEffect(() => {
    if (miner && !loginCtx.isLoggedIn && isLoginRequiredToAccessEntity(miner)) {
      router.push('/');
    }
  }, [token, miner, loginCtx.isLoggedIn, router]);

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

    return null;
  };

  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Miners statistics</title>
      </Head>
      <div className="container">
        {!Cookies.get(COOKIES.hasSeenRegisterDialog) &&
          !loginCtx.isLoggedIn && <DelayedExchangeRegisterDialog />}

        {isLoading && (
          <div className="loading-spinner">
            <LoadingSpinner />
          </div>
        )}

        {token && supportedMiners && supportedMiners[miner] ? (
          <>
            <MinerStatsPage
              selectedMiner={miner}
              selectedExchange={BINANCE}
              selectedToken={token}
              supportedMiners={supportedMiners}
              onChangeToken={pushToPage}
            />
          </>
        ) : (
          token &&
          miner && (
            <div className="no-support">
              <div>
                <p>
                  This combination of token and miner is not currently
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

export default Miner;
