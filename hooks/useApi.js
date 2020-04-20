import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApi = (url, dependencies) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (
      !dependencies ||
      !dependencies.some(
        dependency => dependency === undefined || dependency === null
      )
    ) {
      setData(null);

      const getApiResult = async () => {
        const apiResult = await axios.get("https://tokenanalyst.github.io/static_data"+url);
        setData(apiResult.data.ta_response);
      };

      getApiResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies || []);

  return data;
};
