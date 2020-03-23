import React, { useState } from 'react';
import Head from 'next/head';

import classNames from 'classnames';
import { FlowsTable } from '../../organism/FlowsTable';
import { FilterNav } from '../../organism/FilterNav';
import { DATA_WINDOWS, UNITS } from '../../../../constants/filters';
import { underSubNav } from '../../../../constants/styles/common-styled-jsx';
import { useApi } from '../../../../hooks';
import { LoadingSpinner } from '../../atoms/LoadSpinner';
import { filterTable } from '../../organism/FlowsTable/helpers';
import { MetricSummary } from '../../organism/MetricsSummary';
import { useGetSummary } from '../../../../hooks/useGetSummary';

export const DahsboardPage = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[0]);
  const [units, setUnits] = useState(UNITS[0]);
  const ioTableData = useApi('/api/exchange-io');
  const [summary] = useGetSummary({});

  const ENTITIES_BTC = [
    {
      name: 'Exchanges',
      data: summary.exchangeBTC,
      link: '/exchange/BTC/Binance',
    },
    { name: 'Miners', data: summary.minerBTC, link: '/miner/BTC/antpool' },
  ];

  const ENTITIES_ETH = [
    {
      name: 'Exchanges',
      data: summary.exchangeETH,
      link: '/exchange/ETH/Binance',
    },
    {
      name: 'Miners',
      data: summary.minerBTC,
      link: '/miner/BTC/antpool',
      isDisabled: true,
    },
  ];

  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Latest On-Chain Flows</title>
      </Head>
      <div className="container">
        <div className="filter-nav">
          <FilterNav
            dataWindow={dataWindow}
            setDataWindow={setDataWindow}
            units={units}
            setUnits={setUnits}
          />
        </div>
        <div className="metrics-summary">
          <div className="metrics-summary-container">
            {Object.keys(summary).length !== 0 ? (
              <MetricSummary
                token="Bitcoin"
                entities={ENTITIES_BTC}
                value={ENTITIES_BTC[0].data.token.price}
                variation={ENTITIES_BTC[0].data.token.price_pct_change}
                dataWindow={dataWindow}
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>
          <div className="separator" />
          <div
            className={classNames('metrics-summary-container', 'with-padding')}
          >
            {Object.keys(summary).length !== 0 ? (
              <MetricSummary
                token="Ethereum"
                entities={ENTITIES_ETH}
                value={ENTITIES_ETH[0].data.token.price}
                variation={ENTITIES_ETH[0].data.token.price_pct_change}
                dataWindow={dataWindow}
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>

          {/* <div className="separator" />
          <MetricSummary token="Stablecoins" entities={ENTITIES_STABLE} /> */}
        </div>
        <div className="under-sub-nav">
          <h2>{`${dataWindow} Exchanges Inflows/Outflows`}</h2>
          <div className="table">
            {ioTableData ? (
              <FlowsTable
                data={filterTable(ioTableData)}
                dataWindow={dataWindow}
                units={units}
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{underSubNav}</style>
      <style jsx>
        {`
          .container {
            margin-right: 10px;
            margin-left: 10px;
          }
          .separator {
            border-left: 1px solid rgb(203, 203, 203);
          }
          .filter-nav {
            margin-right: -10px;
            margin-left: -10px;
          }
          .metrics-summary-container {
            display: flex;
            height: 450px;
            width: 100%;
          }
          .with-padding {
            padding-left: 25px;
          }
          .metrics-summary {
            padding-top: 50px;
            display: flex;
            width: 100%;
          }
          .table {
            margin-left: 5px;
            margin-right: 5px;
          }
          h2 {
            font-family: Space Grotesk;
            font-size: 22px;
            font-weight: bold;
            opacity: 0.4;
            padding-left: 10px;
          }
          .spinner {
            display: flex;
            height: 100%;
            width: 100%;
            align-items: center;
          }
          @media only screen and (max-width: 768px) {
            .table {
              margin-left: 5px;
              margin-right: 5px;
            }
            .section-header {
              display: none;
            }
            .metrics-summary {
              flex-direction: column;
            }
            .metrics-summary-container {
              height: 900px;
            }
            .with-padding {
              padding-left: 0px;
            }
          }
        `}
      </style>
    </>
  );
};
