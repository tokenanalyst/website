import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { SUPPORTED_EXCHANGES } from '../../../constants/exchanges';
import { NATIVE_TOKENS } from '../../../constants/tokens';
import { TOKEN_TO_EXCHANGE } from '../../../constants/exchanges';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;

  console.log(router.query);

  // useEffect(()=>{
  //   console.log('useEffect')
  //   console.log(token)
  // },[])

  if (token) {
    const supportedExchanges = Object.keys(SUPPORTED_EXCHANGES).reduce(
      (acc, exchange) => {
        SUPPORTED_EXCHANGES[exchange][token.toUpperCase()]
          ? [...acc, exchange]
          : acc;
      },
      []
    );

    const supportedTokens = SUPPORTED_EXCHANGES[exchange];

    console.log(supportedExchanges);
    console.log(supportedTokens);
  }

  // const supportedExchanges = Object.keys(SUPPORTED_EXCHANGES).reduce(
  //   (acc, exchange) => {
  //     SUPPORTED_EXCHANGES[exchange][token.toUpperCase()]
  //       ? [...acc, exchange]
  //       : acc;
  //   },
  //   []
  // );

  // const supportedTokens = SUPPORTED_EXCHANGES[exchange];

  // console.log(supportedExchanges);
  // console.log(supportedTokens);

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
        (NATIVE_TOKENS[token] ? (
          <>
            <ProChartWidget
              selectedExchange={exchange}
              selectedToken={token}
              onChangeExchange={newExchange => {
                router.push(
                  `/exchange/[token]/[exchange]`,
                  `/exchange/${
                    SUPPORTED_EXCHANGES[newExchange].indexOf(token) > 0
                      ? token
                      : SUPPORTED_EXCHANGES[newExchange][0]
                  }/${newExchange}`
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
              <a href="http://kaiko.com" target="_blank" className="link">
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
          <IoChartWidget token={token} exchange={exchange} />
        ))}
    </div>
  );
};

export default Exchange;
