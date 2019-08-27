import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { getStableCoinTableData } from "../data-transformers/tables";
import { useApi } from "../custom-hooks";
import { StableCoinTable } from "../components/tables/StableCoinTable";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { getStablecoinVolumeDataSet } from "../data-transformers/charts/getStablecoinVolumeDataSet";

const SimpleChart = dynamic(
  () => import("../components/charts/SimpleChart").then(mod => mod.SimpleChart),
  {
    ssr: false
  }
);

const StableCoins = () => {
  const tableApiData = useApi("/api/stablecoin-onchain-metrics");
  const volumeChartApiData = useApi("/api/stablecoin-volumes");
  const [tableData, setTableData] = useState(null);
  const [volumeChartData, setVolumeChartData] = useState(null);

  useEffect(() => {
    if (tableApiData) {
      setTableData(getStableCoinTableData(tableApiData));
    }
    if (volumeChartApiData) {
      setVolumeChartData(getStablecoinVolumeDataSet(volumeChartApiData));
    }
  }, [tableApiData, volumeChartApiData]);

  return (
    <>
      {tableData && volumeChartData ? (
        <div className="container">
          <div className="header">Stablecoins</div>
          <StableCoinTable tableData={tableData} />
          <div className="header">Volumes</div>
          <div className="chart">
            <SimpleChart
              dataSet={volumeChartData}
              seriesType="line"
              width={1200}
              height={400}
            />
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
        .chart {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default StableCoins;
