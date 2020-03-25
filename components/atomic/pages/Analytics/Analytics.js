import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Divider } from '@blueprintjs/core';

import { LoginContext } from '../../../../contexts/Login';
import { LeftSidePanelMetrics } from '../../organism/LeftSidePanelAnalytics';

const BIG = 'BIG';
const MED = 'MED';
const SML = 'SML';

const SIZE_MAPPINGS = {
  [BIG]: '100%',
  [MED]: '50%',
  [SML]: '33.3%',
};

const IMAGE_SOURCES = {
  [BIG]: 'static/png/blurred-chart-large.png',
  [MED]: 'static/png/blurred-chart-medium.png',
  [SML]: 'static/png/blurred-chart-small.png',
};

export const Analytics = () => {
  const [charts, setCharts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getCharts = async () => {
      const res = await axios.get(
        'https://plotly.tokenanalyst.io/chart-metadata'
      );
      setCharts(res.data.items);
      setCategories(res.data.categories);
      setSelectedCategory(res.data.categories[0]);
    };

    getCharts();
  }, []);

  const loginCtx = useContext(LoginContext);

  return (
    <>
      <div className="container">
        <div className="left-panel">
          {categories && (
            <LeftSidePanelMetrics
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={category => setSelectedCategory(category)}
            />
          )}
        </div>
        <div className="right-panel">
          {charts && (
            <div className="charts">
              {selectedCategory === 'All'
                ? charts.map(chart =>
                    !loginCtx.isLoggedIn && chart.reg_wall ? (
                      <React.Fragment key={chart.url}>
                        <div
                          className="placeholder"
                          style={{ width: SIZE_MAPPINGS.BIG }}
                          onClick={() => {
                            loginCtx.setPostRegisterViaAnalyticsUrl(
                              '/analytics'
                            );
                            router.push('/register');
                          }}
                          onKeyDown={() => {
                            loginCtx.setPostRegisterViaAnalyticsUrl(
                              '/analytics'
                            );
                            router.push('/register');
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="placeholder-message">
                            <div>
                              <img
                                src={IMAGE_SOURCES[chart.type]}
                                className="blurred-image"
                                width={SIZE_MAPPINGS.BIG}
                                height="470px"
                                alt="blurred bgr"
                              />
                            </div>
                            <div className="blurred-image-text">
                              Sign up for this Analytic and more!
                              <img
                                src="static/png/logo_mobile.png"
                                className="logo"
                                alt="TokenAnalyst logo"
                              />
                            </div>
                          </div>
                        </div>
                        <Divider style={{ width: SIZE_MAPPINGS.BIG }} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={chart.url}>
                        <iframe
                          key={chart.url}
                          title="analytics-charts"
                          src={chart.url}
                          width={
                            window.matchMedia(
                              '(min-width: 320px) and (max-width: 767px)'
                            ).matches
                              ? SIZE_MAPPINGS.BIG
                              : SIZE_MAPPINGS.BIG
                          }
                          height="475px"
                          frameBorder="0"
                          className="chart"
                        />
                        <Divider style={{ width: SIZE_MAPPINGS.BIG }} />
                      </React.Fragment>
                    )
                  )
                : charts
                    .filter(chart => chart.category === selectedCategory)
                    .map(chart =>
                      !loginCtx.isLoggedIn && chart.reg_wall ? (
                        <div
                          className="placeholder-container"
                          style={{ width: SIZE_MAPPINGS.BIG }}
                          onClick={() => {
                            loginCtx.setPostRegisterViaAnalyticsUrl(
                              '/analytics'
                            );
                            router.push('/register');
                          }}
                          onKeyDown={() => {
                            loginCtx.setPostRegisterViaAnalyticsUrl(
                              '/analytics'
                            );
                            router.push('/register');
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="placeholder-message">
                            <div>
                              <img
                                src={IMAGE_SOURCES[chart.type]}
                                className="blurred-image"
                                width="100%"
                                height="470px"
                                alt="blurred-bgr"
                              />
                            </div>
                            <div className="blurred-image-text">
                              Sign up for this Analytic and more!
                              <img
                                src="static/png/logo_mobile.png"
                                alt="TokenAnalyst logo"
                                className="logo"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          key={chart.url}
                          title="analytics-charts"
                          src={chart.url}
                          width={SIZE_MAPPINGS.BIG}
                          height="475px"
                          frameBorder="0"
                          className="chart"
                        />
                      )
                    )}
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .left-panel {
            width: 300px;
          }
          .right-panel {
            width: 100%;
            margin-left: 10px;
          }
          .cat-link {
            padding-bottom: 10px;
          }
          .charts {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
          }
          .chart {
          }
          .placeholder-container {
            position: relative;
            cursor: pointer;
          }
          .placeholder-message {
            position: relative;
          }
          .blurred-image {
            filter: blur(4px);
          }
          .blurred-image-text {
            left: 50%;
            top: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
          }
          .logo {
            height: 60px;
            border-radius: 10px;
            margin-top: 10px;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .charts {
              width: 100%;
            }
            .container {
              flex-direction: column;
            }
            .left-panel {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};
