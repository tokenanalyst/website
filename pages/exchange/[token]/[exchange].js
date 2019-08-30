import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useApi } from "../../../custom-hooks";
import { getExchangeDataSet } from "../../../data-transformers/charts/getExchangeDataSet";
import { getExchangeMetrics } from "../../../data-transformers/widgets/getExchangeMetrics";
import { DATA_WINDOWS } from "../../../constants/filters";
import { ExchangeMetricsWidget } from "../../../components/widgets/ExchangeMetricsWidget";
import { IoChartWidget } from "../../../components/widgets/IoChartWidget";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

const Exchange = () => {
  const router = useRouter();
  const [dataSet, setDataSet] = useState(null);
  const [overallMetrics, setOverallMetrics] = useState(null);

  // Router query params are populated post-hydration so in order to avoid losing the static
  // optimisation benefit we wait for the population to happen client side before accessing
  // https://www.npmjs.com/package/next#dynamic-routing
  const apiResponse = useApi(
    `/api/exchange-metrics?token=${router.query.token}&exchange=${router.query.exchange}`,
    [router.query.token, router.query.exchange]
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Very depressing that I need this here but the page remains focused on the footer even after loading - dunno why
    if (apiResponse && router.query.token) {
      setDataSet(getExchangeDataSet(apiResponse, router.query.token));
      setOverallMetrics(
        getExchangeMetrics(
          apiResponse.overall.find(item => item.window === DATA_WINDOWS[0])
        )
      );
    }
  }, [apiResponse, router.query.token]);

  return (
    <>
      {dataSet && overallMetrics ? (
        <>
          <ExchangeMetricsWidget
            overallMetrics={overallMetrics}
            token={router.query.token}
            exchange={router.query.exchange}
          />
          <IoChartWidget dataSet={dataSet} setDataSet={setDataSet} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Exchange;
