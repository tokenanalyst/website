import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { DelayedDialog } from '../../../components/DelayedDialog';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);

  useEffect(() => {
    const exchangeSupport = tokensDb.getTokenSupportOnExchange(token, exchange);

    if (exchangeSupport) {
      setIsTVSupported(true);
    }
  }, [token, exchange]);

  const pushToPage = (newToken, newExchange) => {
    router.push(
      `/exchange/[token]/[exchange]`,
      `/exchange/${newToken}/${newExchange}?tier=${Cookies.get(COOKIES.tier)}`
    );
  };

  return (
    <div>
      <Head>
        <title>
          {`TokenAnalyst - ${exchange} - ${token} Inflows and Outflows`}
        </title>
      </Head>

      <DelayedDialog
        header="Need More Granularity?"
        subHeader="Sign up now for FREE to access TokenAnalyst charts in a 1 hour granularity across ALL tokens and exchanges!"
        timeout={5000}
        onCtaClick={() => router.push('/register')}
      >
        <>
          <img src="/static/png/chart-demo.png" className="image" />
          <style jsx>
            {`
              .image {
                width: 800px;
              }
            `}
          </style>
        </>
      </DelayedDialog>
      <ExchangeMetricsWidget token={token} exchange={exchange} />
      {token && exchange && isTVSupported ? (
        <>
          <ProChartWidget
            selectedExchange={exchange}
            selectedToken={token}
            tokensDb={tokensDb}
            onChange={pushToPage}
          />
          <div className="kaiko">
            Order book data by
            <a
              href="https://www.kaiko.com/?rfsn=3222089.6abb9f&utm_source=refersion&utm_medium=affiliate&utm_campaign=3222089.6abb9f"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Kaiko
            </a>
          </div>
          <style jsx>
            {`
              .kaiko {
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
              }
              .link {
                padding-left: 3px;
              }
            `}
          </style>
        </>
      ) : (
        token && exchange && <IoChartWidget token={token} exchange={exchange} />
      )}
    </div>
  );
};

export default Exchange;
