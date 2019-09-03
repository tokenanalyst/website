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
      {tableData && volumeChartData && transactionsChartData ? (
        <div className="container">
          <div className="charts">
            <div className="chart">
              <PageSection text={"Volumes"} />
              <SimpleChart
                dataSet={volumeChartData}
                seriesType="line"
                width={
                  window.matchMedia("(max-width: 768px)").matches ? 300 : 650
                }
                height={
                  window.matchMedia("(max-width: 768px)").matches ? 300 : 400
                }
              />
            </div>
            <div className="chart">
              <PageSection text={"Transactions"} />
              <SimpleChart
                dataSet={transactionsChartData}
                seriesType="line"
                width={
                  window.matchMedia("(max-width: 768px)").matches ? 300 : 650
                }
                height={
                  window.matchMedia("(max-width: 768px)").matches ? 300 : 400
                }
              />
            </div>
          </div>
          <div className="table-section-header">24hr Stats</div>
          <div className="table">
            <StableCoinTable tableData={tableData} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <div />
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
        }
        .charts {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding-bottom: 20px;
          padding-top: 20px;
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
          margin-left: 25px;
          margin-right: 25px;
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
