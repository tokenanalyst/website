import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import {
  TOKENS_TV_SUPPORT,
  TOKENS_EXCHANGE_SUPPORT,
} from '../../../constants/exchanges';
import { COOKIES } from '../../../constants/cookies';
import {
  NATIVE_TOKENS,
  ERC20_TOKENS,
  STABLE_TOKENS,
} from '../../../constants/tokens';
import { tokensDb } from '../../../utils/tokensDb';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;
  const [proChartsupportedExchanges, setProChartSupportedExchanges] = useState(
    []
  );
  const [proChartsupportedTokens, setProChartSupportedTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(tokensDb);
    const supportedExchanges = Object.keys(TOKENS_TV_SUPPORT).reduce(
      (acc, exchangeName) => {
        if (TOKENS_TV_SUPPORT[exchangeName].indexOf(token) !== -1) {
          return [...acc, exchangeName];
        }

        return acc;
      },
      []
    );
    console.log(exchange);
    console.log(supportedExchanges, TOKENS_TV_SUPPORT.BitMEX);
    console.log(TOKENS_TV_SUPPORT[exchange]);
    setProChartSupportedExchanges(supportedExchanges);
    setProChartSupportedTokens(TOKENS_TV_SUPPORT);
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
            tokensDb={tokensDb}
            onChangeExchange={newExchange => {
              router.push(
                `/exchange/[token]/[exchange]`,
                `/exchange/${
                  TOKENS_TV_SUPPORT[newExchange].indexOf(token) > 0
                    ? token
                    : TOKENS_TV_SUPPORT[newExchange][0]
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
