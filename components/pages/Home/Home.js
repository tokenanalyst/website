import React from 'react';
import Head from 'next/head';

import { IoTable } from '../../tables/IoTable';
import { DATA_WINDOWS, UNITS } from '../../../constants/filters';
import { TokenSnapshotWidget } from '../../widgets/TokenSnapshotWidget';
import { useApi } from '../../../custom-hooks';
import { LoadingSpinner } from '../../LoadingSpinner';
import { filterTable } from '../../tables/IoTable/helpers';
import { pricingButton } from '../../../constants/styles/common-styled-jsx';
import { Products } from './Products';
import { ButtonMarketing } from '../../ButtonMarketing';
import { emitProductEvent } from './utils/emitProductEvent';

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
              <div className="top-buttons">
                <div className="top-button">
                  <ButtonMarketing
                    url="/dashboard"
                    isExternal={false}
                    text="View Dashboard"
                    isActive={false}
                    isLoading={false}
                    onClick={() =>
                      emitProductEvent(
                        'Top Dashboard Button',
                        'home-top-button-dashboard'
                      )
                    }
                  />
                </div>
                <div className="top-button">
                  <ButtonMarketing
                    url="/pricing"
                    isExternal={false}
                    text="Subscribe now"
                    isActive
                    isLoading
                    onClick={() =>
                      emitProductEvent(
                        'Top Subscribe Button',
                        'home-top-button-subscribe'
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="top-container-charts">
            <div className="token-snapshot">
              <TokenSnapshotWidget
                dataWindow={DATA_WINDOWS[0]}
                units={units}
                maxItems={2}
                itemsDirection="row"
                disabled
                isHome
              />
            </div>
            <div className="table">
              {ioTableData ? (
                <IoTable
                  data={filterTable(ioTableData)}
                  dataWindow={dataWindow}
                  units={units}
                  pageSize={5}
                  showPagination={false}
                  showPageSizeOptions={false}
                  compactLayout
                />
              ) : (
                <div>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="products">
            <Products />
          </div>
        </div>
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .top-container {
            display: flex;
            flex-direction: row;
            width: 100%;
            margin-top: 50px;
            max-width: 1400px;
            margin-right: auto;
            margin-left: auto;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 75px;
          }
          .top-container-slogan {
            width: 55%;
          }
          .top-container-charts {
            display: flex;
            flex-direction: column;
            width: 50%;
            min-height: 600px;
            margin-top: 30px;
          }
          .bottom-container {
            margin-top: 50px;
            height: 100%;
            margin-right: auto;
            margin-left: auto;
            background-color: #e8e8e8;
          }
          .products {
            max-width: 1400px;
            margin-right: auto;
            margin-left: auto;
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
          .table {
            margin-top: 50px;
            height: 250px;
          }
          .token-snapshot {
            height: 310px;
          }
          .top-buttons {
            display: flex;
          }
          .top-button {
            margin-right: 20px;
          }
          @media only screen and (max-width: 1360px) {
            .table {
              display: none;
            }
          }
          @media only screen and (max-width: 768px) {
            .top-container {
              padding-bottom: 75px;
              margin-top: 25px;
              width: 100%;
            }
            .title {
              font-size: 40px;
            }
            .description {
              margin-bottom: 50px;
              font-size: 26px;
            }
            .token-snapshot {
              display: none;
            }
            .bottom-container {
              margin-top: 0px;
              background-color: transparent;
            }
            .top-container-charts {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

export default Home;
