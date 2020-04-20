import { useState, useEffect } from 'react';
import axios from 'axios';

import { NATIVE_TOKENS } from '../constants/tokens';

export const useGetSummary = () => {
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    const apiCalls = [
      axios.get(`https://tokenanalyst.github.io/static_data/api/latest-miner-stats_tokens_${NATIVE_TOKENS.BTC}`.toLowerCase()),
      axios.get(`https://tokenanalyst.github.io/static_data/api/latest-exchange-stats_tokens_${NATIVE_TOKENS.ETH}`.toLowerCase()),
      axios.get(`https://tokenanalyst.github.io/static_data/api/latest-exchange-stats_tokens_${NATIVE_TOKENS.BTC}`.toLowerCase()),
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
