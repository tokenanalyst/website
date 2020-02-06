import React from 'react';
import Head from 'next/head';

import { IoTable } from '../../tables/IoTable';
import { DATA_WINDOWS, UNITS } from '../../../constants/filters';
import { TokenSnapshotWidget } from '../../widgets/TokenSnapshotWidget';
import { useApi } from '../../../custom-hooks';
import { LoadingSpinner } from '../../LoadingSpinner';
import { filterTable } from '../../tables/IoTable/helpers';
import { pricingButton } from '../../../constants/styles/common-styled-jsx';

export const Home = () => {
  const dataWindow = DATA_WINDOWS[0];
  const ioTableData = useApi('/api/exchange-io');
  const units = UNITS[0];

  return (
    <>
      <Head>
        <title>TokenAnalyst - Latest On-Chain Flows</title>
      </Head>
      <div className="under-sub-nav">
        <div className="top-container">
          <div className="top-container-slogan">
            <div className="slogan">
              <h1 className="title">Blockchain Market Intelligence</h1>
              <p className="description">
                Enterprise-grade data and tools to understand and access
                blockchains.
              </p>
              <div>
                <button
                  className="button"
                  type="button"
                  onClick={() => window.Intercom('show')}
                >
                  Access Data
                </button>
              </div>
            </div>
          </div>
          <div className="top-container-charts">
            <div>
              <TokenSnapshotWidget
                dataWindow={DATA_WINDOWS[0]}
                units={units}
                maxItems={2}
                itemsDirection="row"
              />
            </div>
            <div className="table">
              {ioTableData ? (
                <IoTable
                  data={filterTable(ioTableData)}
                  dataWindow={dataWindow}
                  units={units}
                  pageSize={5}
                />
              ) : (
                <div className="spinner">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bottom-container">bottom</div>
        <>
          {/* <h2>At a glance</h2>
          <TokenSnapshotWidget
            dataWindow={dataWindow}
            units={units}
            maxItems={2}
            itemsDirection="column"
          />
          <h2>{`${dataWindow} Inflows/Outflows`}</h2>
          <div className="table">
            {ioTableData ? (
              <IoTable
                data={filterTable(ioTableData)}
                dataWindow={dataWindow}
                units={units}
                pageSize={5}
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div> */}
        </>
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .table {
            margin-left: 5px;
            margin-right: 5px;
          }
          .spinner {
            height: 296px;
          }
          .top-container {
            display: flex;
            flex-direction: row;
            width: 100%;
            margin-top: 50px;
            max-width: 1400px;
            margin-right: auto;
            margin-left: auto;
          }
          .top-container-slogan {
            width: 55%;
          }
          .top-container-charts {
            display: flex;
            flex-direction: column;
            width: 45%;
            margin-top: 30px;
          }
          .bottom-container {
            margin-top: 100px;
            background-color: #80808059;
            height: 600px;
          }
          .title {
            font-family: Space Grotesk;
            font-size: 54px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.11;
            letter-spacing: -0.31px;
            color: #000000;
            max-width: 300px;
          }
          .description {
            font-family: Cardo;
            font-size: 30px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 125px;
            max-width: 320px;
          }
          @media only screen and (max-width: 768px) {
            .table {
              margin-left: 5px;
              margin-right: 5px;
            }
            .section-header {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
