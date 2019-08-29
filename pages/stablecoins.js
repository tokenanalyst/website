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
      {tableData && volumeChartData ? (
        <div className="container">
          <div className="header">Stablecoins (24h)</div>
          <StableCoinTable tableData={tableData} />
          <div className="charts">
            <div className="chart">
              <div className="header">Volumes</div>
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
              <div className="header">Transactions</div>
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
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <div />
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 20px;
          padding-top: 30px;
          text-align: center;
        }
        .charts {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding-top: 20px;
        }
        .chart {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 20px;
        }
        @media only screen and (max-width: 768px) {
          .charts {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default StableCoins;
