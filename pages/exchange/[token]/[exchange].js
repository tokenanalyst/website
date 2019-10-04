import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { SUPPORTED_EXCHANGES } from '../../../constants/exchanges';
import { EXCHANGE_TOKENS } from '../../../constants/exchanges';
import { NATIVE_TOKENS } from '../../../constants/tokens';
import { COOKIES } from '../../../constants/cookies';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;
  const [supportedExchanges, setSupportedExchanges] = useState(null);
  const [supportedTokens, setSupportedTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const exchanges = Object.keys(SUPPORTED_EXCHANGES).reduce(
      (acc, exchange) => {
        if (SUPPORTED_EXCHANGES[exchange].indexOf(token) !== -1) {
          return [...acc, exchange];
        }

        return acc;
      },
      []
    );

    setSupportedExchanges(exchanges);
    setSupportedTokens(SUPPORTED_EXCHANGES[exchange]);
    if (token && exchange) {
      setIsLoading(false);
    }
  }, [token, exchange]);

  return (
    <div>
      <Head>
        <title>
          TokenAnalyst - {exchange} - {token} Inflows and Outflows
        </title>
      </Head>
      <ExchangeMetricsWidget token={token} exchange={exchange} />
      {token &&
        exchange &&
        supportedExchanges.length && !isLoading ? (
          <>
            <ProChartWidget
            selectedExchange={exchange}
            selectedToken={token}
            supportedTokens={supportedTokens}
            supportedExchanges={supportedExchanges}
              onChangeExchange={newExchange => {
                router.push(
                  `/exchange/[token]/[exchange]`,
                  `/exchange/${
                    SUPPORTED_EXCHANGES[newExchange].indexOf(token) > 0
                    ? token
                    : SUPPORTED_EXCHANGES[newExchange][0]
                  }/${newExchange}?tier=${Cookies.get(COOKIES.tier)}`
                );
              }}
              onChangeToken={newToken => {
                router.push(
                  `/exchange/[token]/[exchange]`,
                  `/exchange/${newToken}/${exchange}`
                );
              }}
            />
            <div className="kaiko">
              Order book data by{' '}
              <a
                href="https://www.kaiko.com/?rfsn=3222089.6abb9f&utm_source=refersion&utm_medium=affiliate&utm_campaign=3222089.6abb9f"
                target="_blank"
                className="link"
              >
                Kaiko
              </a>
            </div>
            <style jsx>{`
              .kaiko {
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
              }
              .link {
                padding-left: 3px;
              }
            `}</style>
          </>
        ) : (
          !isLoading && <IoChartWidget token={token} exchange={exchange} />
        ))}
    </div>
  );
};

export default Exchange;
