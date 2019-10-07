import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getCompareDataSet } from '../../../data-transformers/charts/getCompareDataSet';
import { CHART_MODES } from '../../../constants/chartTypes';
import { NATIVE_TOKENS } from '../../../constants/tokens';
import { LoadingSpinner } from '../../LoadingSpinner';
import { colors } from '../../../constants/styles/colors';
import { underSubNav } from '../../../constants/styles/common-styled-jsx';

import { LayoutMobile } from './LayoutMobile';
import { LayoutDesktop } from './LayoutDesktop';

export const CompareChartWidget = () => {
  const [tokenLhs, setTokenLhs] = useState(NATIVE_TOKENS.BTC);
  const [tokenDataSetLhs, setTokenDataSetLhs] = useState(null);

  const [tokenRhs, setTokenRhs] = useState(NATIVE_TOKENS.ETH);
  const [tokenDataSetRhs, setTokenDataSetRhs] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [tokenCache, setTokenCache] = useState({});

  const [chartMode, setChartMode] = useState(CHART_MODES.logarithmic);

  async function getTokenDataSet(token, color) {
    let response;
    if (!tokenCache[token]) {
      setIsLoading(true);
      response = await axios.get(`/api/network-data?token=${token}`);
      tokenCache[token] = response;
      setTokenCache(prevCache => ({ ...prevCache, [token]: response }));
      setIsLoading(false);
    } else {
      response = { ...tokenCache[token] };
    }

    return getCompareDataSet(response.data.ta_response, token, color);
  }

  useEffect(() => {
    const updateData = async () => {
      let dataSet = await getTokenDataSet(
        tokenLhs,
        `rgba(${colors.primaryRed}, 1)`
      );
      setTokenDataSetLhs(dataSet);
    };

    updateData();
  }, [tokenLhs]);

  useEffect(() => {
    const updateData = async () => {
      let dataSet = await getTokenDataSet(
        tokenRhs,
        `rgba(${colors.primaryGreen}, 1)`
      );
      setTokenDataSetRhs(dataSet);
    };

    updateData();
  }, [tokenRhs]);

  return (
    <>
      {tokenDataSetLhs && tokenDataSetRhs ? (
        <div>
          {window.matchMedia('(min-width: 320px) and (max-width: 767px)')
            .matches ? (
            <LayoutMobile
              tokenLhs={tokenLhs}
              setTokenLhs={setTokenLhs}
              tokenDataSetLhs={tokenDataSetLhs}
              setTokenDataSetLhs={setTokenDataSetLhs}
              tokenRhs={tokenRhs}
              setTokenRhs={setTokenRhs}
              tokenDataSetRhs={tokenDataSetRhs}
              setTokenDataSetRhs={setTokenDataSetRhs}
              chartMode={chartMode}
              setChartMode={setChartMode}
              isLoading={isLoading}
            />
          ) : (
            <LayoutDesktop
              tokenLhs={tokenLhs}
              setTokenLhs={setTokenLhs}
              tokenDataSetLhs={tokenDataSetLhs}
              setTokenDataSetLhs={setTokenDataSetLhs}
              tokenRhs={tokenRhs}
              setTokenRhs={setTokenRhs}
              tokenDataSetRhs={tokenDataSetRhs}
              setTokenDataSetRhs={setTokenDataSetRhs}
              chartMode={chartMode}
              setChartMode={setChartMode}
              isLoading={isLoading}
            />
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
