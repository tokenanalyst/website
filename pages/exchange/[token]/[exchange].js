import React from 'react';
import { useRouter } from 'next/router';

import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { ProChartWidget } from '../../../components/widgets/ProChartWidget';
import { EXCHANGE_TOKENS } from '../../../constants/exchanges';

const Exchange = () => {
  const router = useRouter();
  const { token, exchange } = router.query;

  return (
    <div>
      <ExchangeMetricsWidget token={token} exchange={exchange} />
      {token && exchange && (
        <>
          <ProChartWidget
            exchange={exchange}
            token={token}
            onChangeExchange={newExchange => {
              router.push(
                `/exchange/[token]/[exchange]`,
                `/exchange/${EXCHANGE_TOKENS[newExchange][0]}/${newExchange}`
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
      )}
    </div>
  );
};

export default Exchange;
