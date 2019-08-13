import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = (url, dependencies) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (
      !dependencies ||
      !dependencies.some(
        dependency => dependency === undefined || dependency === null
      )
    ) {
      const getApiResult = async () => {
        console.log(dependencies);
        const apiResult = await axios.get(url);
        setData(apiResult.data.ta_response);
      };

      getApiResult();
    }
  }, dependencies || []);

  return data;
};
