import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useApi } from "../../../custom-hooks";
import { getExchangeDataSet } from "../../../components/charts/datasets";
import { DATA_WINDOWS } from "../../../constants/filters";
import { ExchangeMetricsWidget } from "../../../components/widgets/ExchangeMetricsWidget";
import { SimpleChartWidget } from "../../../components/widgets/SimpleChartWidget";

const Exchange = () => {
  const router = useRouter();
  const [dataSet, setDataSet] = useState(null);
  const [overallMetrics, setOverallMetrics] = useState(null);

  // router.query has an annoying bug whereby it is initially undefined (when page refreshed or link
  // directly navigated to) and so the API call that is dependent on it fails.
  // Added as a dependency to the custom hook so API request only fires when the
  // router.query's values have been populated
  const apiResponse = useApi(
    `/api/exchange-metrics?token=${router.query.token}&exchange=${
      router.query.exchange
    }`,
    [router.query.token, router.query.exchange]
  );

  // Again with that damn router.query bug
  useEffect(() => {
    if (apiResponse && router.query.token) {
      setDataSet(getExchangeDataSet(apiResponse, router.query.token));
      setOverallMetrics(
        apiResponse.overall.find(item => item.window === DATA_WINDOWS[0])
      );
    }
  }, [apiResponse, router.query.token]);

  return (
    <>
      <ExchangeMetricsWidget
        overallMetrics={overallMetrics}
        token={router.query.token}
        exchange={router.query.exchange}
      />
      <SimpleChartWidget dataSet={dataSet} setDataSet={setDataSet} />
    </>
  );
};

export default Exchange;
