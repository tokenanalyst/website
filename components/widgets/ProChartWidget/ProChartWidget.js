import PropTypes from 'prop-types';
import React, { useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import { makeTVSymbols } from './utils/makeTVSymbols';

import { ProChartContainer } from './ProChartContainer';
import { COOKIES } from '../../../constants/cookies';
import { PLANS } from '../../../constants/plans';
import { Link } from '../../Link';
import { LoginContext } from '../../../contexts/Login';
import { LeftSidePanel } from './LeftSidePanel';

export const ProChartWidget = ({
  selectedExchange,
  selectedToken,
  tokensDb,
  onChange,
}) => {
  const tvInstance = useRef(null);
  const studies = useRef({
    flows: { entityId: null },
    transactions: { entityId: null },
  });

  const exchangeSupport = tokensDb.getTokenSupportOnExchange(
    selectedToken,
    selectedExchange
  );

  const TVSymbols = makeTVSymbols(selectedToken, exchangeSupport);

  const router = useRouter();

  const loginContext = useContext(LoginContext);

  const TIER = Cookies.get(COOKIES.tier);

  const renderCTALink = () => {
    if (TIER !== null) {
      return (
        <Link
          desktopLabel="Sign Up for 1 Hour Granularity"
          href="/register?exchange=true"
          onClick={() => {
            loginContext.setPostRegisterRedirectUrl(router.asPath);
            ReactGA.event({
              category: 'User',
              action: `Click Sign Up CTA Exchange Page`,
              label: `Funnel`,
            });
          }}
        />
      );
    }
    if (TIER < PLANS.PLATFORM.id) {
      return (
        <Link
          desktopLabel="Get Unlimited Data"
          href="/pricing?exchange=true"
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: `Click Upgrade CTA Exchange Page`,
              label: `Funnel`,
            });
          }}
        />
      );
    }

    return null;
  };

  return (
    <div>
      <div className="container">
        <div className="controls-card">
          <div className="cat-link">{renderCTALink()}</div>
          <LeftSidePanel
            selectedExchange={selectedExchange}
            selectedToken={selectedToken}
            tokensDb={tokensDb}
            onChange={onChange}
          />
        </div>
        <div className="pro-chart">
          <ProChartContainer
            timeFrame="3D"
            interval="60"
            TVSymbols={TVSymbols}
            TASymbol={selectedToken}
            exchangeName={selectedExchange}
            onChartRenderCb={tvWidget => {
              tvInstance.current = tvWidget;
              studies.current.flows.entityId = tvInstance.current
                .chart()
                .createStudy('Flows', false, true);
              studies.current.transactions.entityId = tvInstance.current
                .chart()
                .createStudy('NetFlows', false, true);
            }}
          />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            padding-right: 20px;
            justify-content: space-between;
          }
          .controls-card {
            max-height: 75%;
            padding-top: 20px;
            padding-left: 5px;
            width: 11%;
          }
          .cat-link {
            padding-bottom: 10px;
          }
          .pro-chart {
            width: 88%;
          }
          @media (min-width: 768px) and (max-width: 1440px) {
            .controls-card {
              max-height: 75%;
              padding-top: 20px;
              padding-left: 5px;
              width: 14%;
            }
            .pro-chart {
              width: 85%;
            }
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              flex-direction: column-reverse;
            }
            .pro-chart {
              padding-top: 5px;
              width: 100%;
            }
            .controls-card {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

ProChartWidget.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedExchange: PropTypes.string.isRequired,
  selectedToken: PropTypes.string.isRequired,
  tokensDb: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  ).isRequired,
};
