import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = url => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getApiResult = async () => {
      const apiResult = await axios.get(url);
      setData(apiResult.data.ta_response);
    };

    getApiResult();
  }, []);

  return data;
};
