import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { EXCHANGE_TOKENS } from '../../../constants/exchanges';
import { NATIVE_TOKENS } from '../../../constants/tokens';
import { LoginContext } from '../../../contexts/Login';

const Exchange = () => {
  const router = useRouter();
  const loginCtx = useContext(LoginContext);
  const { token, exchange } = router.query;

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
              exchange={exchange}
              token={token}
              onChangeExchange={newExchange => {
                router.push(
                  `/exchange/[token]/[exchange]`,
                  `/exchange/${
                    EXCHANGE_TOKENS[newExchange].indexOf(token) > 0
                      ? token
                      : EXCHANGE_TOKENS[newExchange][0]
                  }/${newExchange}?tier=${loginCtx.tier}`
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
          <IoChartWidget token={token} exchange={exchange} />
        ))}
    </div>
  );
};

export default Exchange;
