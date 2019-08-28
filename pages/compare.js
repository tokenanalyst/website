import React, { useEffect, useState } from "react";
import { useApi } from "../custom-hooks";

import { getCompareDataSet } from "../data-transformers/charts/getCompareDataSet";
import { CompareChartWidget } from "../components/widgets/CompareChartWidget/CompareChartWidget";

const Compare = () => {
  const compareData = useApi("/api/network-data");

  useEffect(() => {
    if (compareData) {
      console.log(getCompareDataSet(compareData, "OMG"));
    }
  }, [compareData]);

  return <>{compareData && <CompareChartWidget response={compareData} />}</>;
};

export default Compare;
