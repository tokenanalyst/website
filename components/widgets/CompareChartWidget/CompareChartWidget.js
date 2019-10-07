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
      <style jsx>{underSubNav}</style>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        @media (min-width: 768px) and (max-width: 1399px) {
          .container {
            flex-direction: column;
          }
          .chart {
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
        @media (min-width: 320px) and (max-width: 767px) {
          .container {
            flex-direction: column;
          }
          .coins {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding-bottom: 10px;
          }
          .coin {
            width: 36px;
            padding-bottom: 10px;
          }
          .coin-info {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .chart {
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .divider {
            display: flex;
            justify-content: space-around;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 10px;
            padding-bottom: 10px;
            align-items: center;
          }
          .token-1 {
            color: rgba(${colors.primaryRed});
          }
          .token-2 {
            color: rgba(${colors.primaryGreen});
          }
          .change-button {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};
