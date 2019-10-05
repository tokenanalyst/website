import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { SUPPORTED_TOKENS } from '../../../constants/exchanges';
import { COOKIES } from '../../../constants/cookies';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;
  const [proChartsupportedExchanges, setproChartSupportedExchanges] = useState(
    []
  );
  const [proChartsupportedTokens, setproChartSupportedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supportedExchanges = Object.keys(SUPPORTED_TOKENS).reduce(
      (acc, exchangeName) => {
        if (SUPPORTED_TOKENS[exchangeName].indexOf(token) !== -1) {
          return [...acc, exchangeName];
        }

        return acc;
      },
      []
    );
    console.log(exchange);
    console.log(supportedExchanges, SUPPORTED_TOKENS.BitMEX);
    console.log(SUPPORTED_TOKENS[exchange]);
    setproChartSupportedExchanges(supportedExchanges);
    setproChartSupportedTokens(SUPPORTED_TOKENS);
    if (token && exchange) {
      setIsLoading(false);
    }
  }, [token, exchange]);

  console.log(exchange);

  return (
    <div>
      <Head>
        <title>
          {`TokenAnalyst - ${exchange} - ${token} Inflows and Outflows`}
        </title>
      </Head>
      <ExchangeMetricsWidget token={token} exchange={exchange} />
      {token && exchange && proChartsupportedExchanges.length && !isLoading ? (
        <>
          <ProChartWidget
            selectedExchange={exchange}
            selectedToken={token}
            supportedTokens={proChartsupportedTokens}
            supportedExchanges={proChartsupportedExchanges}
            onChangeExchange={newExchange => {
              router.push(
                `/exchange/[token]/[exchange]`,
                `/exchange/${
                  SUPPORTED_TOKENS[newExchange].indexOf(token) > 0
                    ? token
                    : SUPPORTED_TOKENS[newExchange][0]
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
        !isLoading && <IoChartWidget token={token} exchange={exchange} />
      )}
    </div>
  );
};

export default Exchange;
