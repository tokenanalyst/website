import React, { useEffect, useState } from "react";

import { getStableCoinTableData } from "../data-sets/tables/getStableCoinTableData";
import { useApi } from "../custom-hooks";
import { StableCoinTable } from "../components/tables/StableCoinTable/StableCoinTable";
import { LoadingSpinner } from "../components/LoadingSpinner";

const StableCoins = () => {
  const data = useApi("/api/stablecoin-onchain-metrics");
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (data) {
      setTableData(getStableCoinTableData(data));
    }
  }, [data]);

  return (
    <>
      {tableData ? (
        <div className="container">
          <div className="header">Stablecoins</div>
          <StableCoinTable tableData={tableData} />
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
      `}</style>
    </>
  );
};

export default StableCoins;
