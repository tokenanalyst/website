import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { getStableCoinTableData } from "../data-transformers/tables";
import {
  getStablecoinVolumeDataSet,
  getStablecoinTransactionsDataSet
} from "../data-transformers/charts";
import { useApi } from "../custom-hooks";
import { StableCoinTable } from "../components/tables/StableCoinTable";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { PageSection } from "../components/PageSection";
import { PricingLink } from "../components/PricingLink";

// lightweight-charts must not be imported on the server (Bang!)
const SimpleChart = dynamic(
  () => import("../components/charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const StableCoins = () => {
  const tableApiData = useApi("/api/stablecoin-onchain-metrics");
  const volumeChartApiData = useApi("/api/stablecoin-volumes");
  const transactionsChartApiData = useApi("/api/stablecoin-transactions");
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
        <PageHeader text={"Stablecoins"} rightElement={<PricingLink />} />
      </div>
      <div className="container">
        <div className="charts">
          <div className="chart">
            <PageSection text={"Volumes"} />
            {volumeChartData ? (
              <SimpleChart
                dataSet={volumeChartData}
                seriesType="line"
                width={
                  window.matchMedia("(max-width: 768px)").matches
                    ? 300
                    : window.matchMedia("(min-width: 1920px)").matches
                    ? 850
                    : 650
                }
                height={
                  window.matchMedia("(max-width: 768px)").matches ? 300 : 400
                }
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>
          <div className="chart">
            <PageSection text={"Transactions"} />
            {transactionsChartData ? (
              <SimpleChart
                dataSet={transactionsChartData}
                seriesType="line"
                width={
                  window.matchMedia("(max-width: 768px)").matches
                    ? 300
                    : window.matchMedia("(min-width: 1920px)").matches
                    ? 850
                    : 650
                }
                height={
                  window.matchMedia("(max-width: 768px)").matches ? 300 : 400
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
          <PageSection text={"24 hr stats"} />
          {tableData ? (
            <StableCoinTable tableData={tableData} />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
      <div />
      <style jsx>{`
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
        .spinner {
          height: 400px;
          width: 650px;
        }
        .table {
          padding: 13px;
        }
        @media only screen and (max-width: 768px) {
          .charts {
            flex-direction: column;
          }
          .chart {
            align-items: center;
          }
          .table {
            margin-left: 5px;
            margin-right: 5px;
          }
          .table-section-header {
            padding-left: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default StableCoins;
