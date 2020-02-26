import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { getStableCoinTableData } from '../data-transformers/tables';
import {
  getStablecoinVolumeDataSet,
  getStablecoinTransactionsDataSet,
} from '../data-transformers/charts';
import { useApi } from '../custom-hooks';
import { StableCoinTable } from '../components/tables/StableCoinTable';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PageHeader } from '../components/atomic/molecules/PageHeader';
import { PageSection } from '../components/atomic/molecules/PageSection';
import { Link } from '../components/Link';

// lightweight-charts must not be imported on the server (Bang!)
const SimpleChart = dynamic(
  () =>
    import('../components/atomic/organism/SimpleChart').then(
      mod => mod.SimpleChart
    ),
  {
    ssr: false,
  }
);

const GRAPH_SIZE = {
  width: {
    mobile: 300,
    tablet: 700,
    desktop: 650,
    desktopLarge: 850,
  },
  height: {
    mobile: 300,
    desktop: 450,
  },
};

const StableCoins = () => {
  const tableApiData = useApi('/api/stablecoin-onchain-metrics');
  const volumeChartApiData = useApi('/api/stablecoin-volumes');
  const transactionsChartApiData = useApi('/api/stablecoin-transactions');
  const [tableData, setTableData] = useState(null);
  const [volumeChartData, setVolumeChartData] = useState(null);
  const [transactionsChartData, setTransactionsChartData] = useState(null);

  useEffect(() => {
    if (tableApiData) {
      setTableData(getStableCoinTableData(tableApiData));
    }
    if (volumeChartApiData) {
      setVolumeChartData(getStablecoinVolumeDataSet(volumeChartApiData));
    }
    if (transactionsChartApiData) {
      setTransactionsChartData(
        getStablecoinTransactionsDataSet(transactionsChartApiData)
      );
    }
  }, [tableApiData, volumeChartApiData, transactionsChartApiData]);

  return (
    <>
      <div>
        <Head>
          <title key="title">TokenAnalyst - Stablecoins</title>
        </Head>
        <PageHeader
          text="Stablecoins"
          rightElement={
            <Link
              href="/pricing"
              desktopLabel="Access historical data"
              mobileLabel="Historical data"
              onClick={() =>
                ReactGA.event({
                  category: 'User',
                  action: `Access historical from Stablecoins`,
                  label: `Funnel`,
                })
              }
            />
          }
        />
      </div>
      <div className="container">
        <div className="charts">
          <div className="chart">
            <PageSection text="Volumes" />
            {volumeChartData ? (
              <SimpleChart
                dataSet={volumeChartData}
                seriesType="line"
                width={
                  window.matchMedia('(min-width: 320px) and (max-width: 767px)')
                    .matches
                    ? GRAPH_SIZE.width.mobile
                    : window.matchMedia(
                        '(min-width: 768px) and (max-width: 1399px)'
                      ).matches
                    ? GRAPH_SIZE.width.tablet
                    : window.matchMedia(
                        '(min-width: 1400px) and (max-width: 1799px)'
                      ).matches
                    ? GRAPH_SIZE.width.desktop
                    : GRAPH_SIZE.width.desktopLarge
                }
                height={
                  window.matchMedia('(max-width: 768px)').matches ? 300 : 400
                }
              />
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div className="chart">
            <PageSection text="Transactions" />
            {transactionsChartData ? (
              <SimpleChart
                dataSet={transactionsChartData}
                seriesType="line"
                width={
                  window.matchMedia('(min-width: 320px) and (max-width: 767px)')
                    .matches
                    ? GRAPH_SIZE.width.mobile
                    : window.matchMedia(
                        '(min-width: 768px) and (max-width: 1399px)'
                      ).matches
                    ? GRAPH_SIZE.width.tablet
                    : window.matchMedia(
                        '(min-width: 1400px) and (max-width: 1799px)'
                      ).matches
                    ? GRAPH_SIZE.width.desktop
                    : GRAPH_SIZE.width.desktopLarge
                }
                height={
                  window.matchMedia('(max-width: 768px)').matches ? 300 : 400
                }
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
        <div className="table">
          <PageSection text="24 hr stats" />
          {tableData ? (
            <StableCoinTable tableData={tableData} />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
      <div />
      <style jsx>
        {`
          .container {
            font-family: Work Sans;
          }
          .charts {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 13px;
          }
          .chart {
            display: flex;
            flex-direction: column;
            padding-bottom: 20px;
          }
          .table-section-header {
            font-size: 22px;
            font-weight: bold;
            opacity: 0.4;
            padding-bottom: 20px;
            padding-left: 30px;
          }
          .table {
            padding: 13px;
          }
          @media (min-width: 1400px) and (max-width: 1799px) {
          }
          @media (min-width: 768px) and (max-width: 1399px) {
            .charts {
              flex-direction: column;
            }
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .charts {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  );
};

export default StableCoins;
