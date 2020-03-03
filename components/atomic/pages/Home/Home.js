/* eslint-disable react/jsx-curly-newline */

import React from 'react';
import Head from 'next/head';

import { FlowsTable } from '../../organism/FlowsTable';
import { DATA_WINDOWS, UNITS } from '../../../../constants/filters';
import { TokenSnapshotWidget } from '../../../widgets/TokenSnapshotWidget';
import { useApi } from '../../../../hooks';
import { LoadingSpinner } from '../../atoms/LoadSpinner';
import { filterTable } from '../../organism/FlowsTable/helpers';
import { pricingButton } from '../../../../constants/styles/common-styled-jsx';
import { Products } from './Products';
import { ButtonMarketing } from '../../../ButtonMarketing';
import { emitProductEvent } from './utils/emitProductEvent';
import { Featured } from './Featured';

export const Home = () => {
  const dataWindow = DATA_WINDOWS[0];
  const ioTableData = useApi('/api/exchange-io');
  const units = UNITS[0];

  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Blockchain Market Intelligence</title>
      </Head>
      <div className="under-sub-nav">
        <div className="home-top-container">
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
                    onClick={() =>
                      emitProductEvent(
                        'Top Dashboard Button',
                        'home-top-button-dashboard'
                      )
                    }
                    isLoading={false}
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
                <FlowsTable
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
        <div className="home-products-container">
          <div className="products-description">
            <div className="products-description-title">
              Blockchain Data products
            </div>
            <div className="products-description-text">
              <p>
                Transparent and actionable tools and data for Bitcoin, Ethereum
                and Stablecoins.
              </p>
              <p>
                We provide data analysis tools for the Bitcoin and Ethereum
                blockchains. Institutional and professional traders get access
                to real-time and historical data on transactions, exchange flows
                and miners actvities.
              </p>
            </div>
          </div>
          <div className="products">
            <Products />
          </div>
        </div>
        <div className="home-featured-container">
          <div className="featured">
            <Featured />
          </div>
        </div>
      </div>
      <style jsx>{pricingButton}</style>
      <style jsx>
        {`
          .home-top-container {
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
          .home-products-container {
            margin-top: 50px;
            height: 100%;
            margin-right: auto;
            margin-left: auto;
            background-color: #f2f2f2;
          }
          .products {
            max-width: 1400px;
            margin-right: auto;
            margin-left: auto;
          }
          .featured {
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
          .products-description {
            display: flex;
            flex-direction: column;
            width: 1440px;
            margin: auto;
            padding-left: 20px;
            padding-right: 20px;
          }
          .products-description-title {
            font-family: Space Grotesk;
            font-weight: 700;
            font-size: 30px;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            -webkit-letter-spacing: 0.26px;
            -moz-letter-spacing: 0.26px;
            -ms-letter-spacing: 0.26px;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 20px;
            margin-top: 50px;
          }
          .products-description-text p {
            font-size: 20px;
            font-family: Open Sans;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            -webkit-letter-spacing: 0.13px;
            -moz-letter-spacing: 0.13px;
            -ms-letter-spacing: 0.13px;
            letter-spacing: 0.13px;
          }

          @media only screen and (max-width: 1360px) {
            .table {
              display: none;
            }
          }
          @media only screen and (max-width: 768px) {
            .products-description {
              width: 100%;
              padding-left: 0px;
              padding-right: 0px;
              padding-bottom: 20px;
            }
            .products-description-title {
              margin-top: 0px;
              font-size: 20px;
            }
            .products-description-text p {
              font-size: 16px;
            }
            .home-top-container {
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
            .home-products-container {
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
