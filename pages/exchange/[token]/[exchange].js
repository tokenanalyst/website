import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { COOKIES } from '../../../constants/cookies';
import { tokensDb } from '../../../services/tokensDb';
import { SimpleDialog } from '../../../components/SimpleDialog';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;
  const [isTVSupported, setIsTVSupported] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);

  useEffect(() => {
    const exchangeSupport = tokensDb.getTokenSupportOnExchange(token, exchange);

    if (exchangeSupport) {
      setIsTVSupported(true);
    }
  }, [token, exchange]);

  useEffect(() => {
    setTimeout(() => setIsDialogShown(true), 3000);
  }, []);

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
      <SimpleDialog
        header="Need more granularity?"
        body="Sign up now for FREE to access our charts in a 1 hour granularity across ALL tokens and exchanges"
        isShown={isDialogShown}
      />
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
              .dialog {
                padding-left: 5px;
                color: blue;
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
