import { useState, useEffect } from 'react';
import axios from 'axios';

import { NATIVE_TOKENS } from '../constants/tokens';

export const useGetSummary = () => {
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    const apiCalls = [
      axios.get(`/api/latest-miner-stats?tokens=${NATIVE_TOKENS.BTC}`),
      axios.get(`/api/latest-exchange-stats?tokens=${NATIVE_TOKENS.ETH}`),
      axios.get(`/api/latest-exchange-stats?tokens=${NATIVE_TOKENS.BTC}`),
    ];

    Promise.all(apiCalls).then(res => {
      const [minerBTC, exchangeETH, exchangeBTC] = res;
      setSummaryData({
        minerBTC: minerBTC.data.BTC,
        exchangeETH: exchangeETH.data.ETH,
        exchangeBTC: exchangeBTC.data.BTC,
      });
    });
  }, []);

  return [summaryData];
};
