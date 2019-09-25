import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useApi } from '../../../custom-hooks';
import { getExchangeDataSet } from '../../../data-transformers/charts/getExchangeDataSet';
import { getExchangeMetrics } from '../../../data-transformers/widgets/getExchangeMetrics';
import { DATA_WINDOWS, TIME_WINDOWS } from '../../../constants/filters';
import { ExchangeMetricsWidget } from '../../../components/widgets/ExchangeMetricsWidget';
import { IoChartWidget } from '../../../components/widgets/IoChartWidget';

const Exchange = () => {
  const router = useRouter();
  const [dataSet, setDataSet] = useState(null);
  const [overallMetrics, setOverallMetrics] = useState(null);
  const { token, exchange } = router.query;
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS.oneDay);

  // Router query params are populated post-hydration so in order to avoid losing the static
  // optimisation benefit we wait for the population to happen client side before accessing
  // https://www.npmjs.com/package/next#dynamic-routing
  const apiResponse = useApi(
    `/api/exchange-metrics?token=${token}&exchange=${exchange}&timeWindow=${timeWindow}`,
    [token, exchange, timeWindow]
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Very depressing that I need this here but the page remains focused on the footer even after loading - dunno why
    if (apiResponse && token) {
      setDataSet(getExchangeDataSet(apiResponse, token, timeWindow));
      setOverallMetrics(
        getExchangeMetrics(
          apiResponse.overall.find(item => item.window === DATA_WINDOWS[0])
        )
      );
    } else {
      setDataSet(null);
    }
  }, [apiResponse, token]);

  return (
    <div>
      <ExchangeMetricsWidget
        overallMetrics={overallMetrics}
        token={token}
        exchange={exchange}
      />
      <div>
        <IoChartWidget
          dataSet={dataSet}
          setDataSet={setDataSet}
          setTimeWindow={setTimeWindow}
          timeWindow={timeWindow}
        />
      </div>
    </div>
  );
};

export default Exchange;
