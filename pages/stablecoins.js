import React, { useEffect, useState } from "react";
import { getStableCoinTableData } from "../data-sets/tables/getStableCoinTableData";
import { useApi } from "../custom-hooks";
import { StableCoinTable } from "../components/tables/StableCoinTable/StableCoinTable";

const StableCoins = () => {
  const data = useApi("/api/stablecoin-onchain-metrics");
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    if (data) {
      setTableData(getStableCoinTableData(data));
    }
  }, data);

  return (
    <>
      {console.log(tableData)}
      {tableData && <StableCoinTable tableData={tableData} />}

      <div />
    </>
  );
};

export default StableCoins;
