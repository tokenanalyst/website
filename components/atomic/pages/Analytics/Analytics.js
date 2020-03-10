import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactGA from 'react-ga';

import { colors } from '../../../../constants/styles/colors';
import { LinkTelegram } from '../../molecules/LinkTelegram';
import { ButtonMarketing } from '../../molecules/ButtonMarketing';
import { SimpleDialog } from '../../atoms/SimpleDialog';
import { LoginContext } from '../../../../contexts/Login';

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

const SidePanel = ({ categories, selectedCategory, onCategorySelect }) => {
  const [isDialogShown, setIsDialogShown] = useState(false);

  return (
    <>
      <SimpleDialog
        header="See what Analytics you can create with our Pro Package!"
        onClose={() => {
          ReactGA.event({
            category: 'User',
            action: `Analytics Dialog Dismissed`,
            label: `Funnel`,
          });
          setIsDialogShown(false);
        }}
        isOpen={isDialogShown}
        ctaText="View Pro"
        onCtaClick={() => {
          ReactGA.event({
            category: 'User',
            action: `Analytics Dialog Upsell Clicked`,
            label: `Funnel`,
          });
          window.location = '/pricing#Professional';
        }}
      >
        <div className="content">
          <div>
            With the TokenAnalyst Pro Package you have access to all of the
            necessary tools to create your very own Analytics and better
            understand the Crypto market
          </div>
          <img
            src="/static/svg/marketing/man_chilling.svg"
            className="image"
            alt="man chilling"
          />
        </div>
      </SimpleDialog>
      <style jsx>
        {`
          .content {
            display: flex;
            padding-top: 20px;
          }
          .image {
            width: 250px;
            padding-left: 30px;
          }
        `}
      </style>
      <div className="container">
        <div className="header">Category:</div>
        {categories.map(category => (
          <div className="row">
            <span
              className={
                category === selectedCategory ? 'item-selected' : 'item'
              }
              onClick={() => onCategorySelect(category)}
              onKeyDown={() => onCategorySelect(category)}
              role="button"
              tabIndex={0}
            >
              {category}
            </span>
          </div>
        ))}
        <div className="more-button">
          <ButtonMarketing
            text="More"
            isExternal={false}
            onClick={() => {
              ReactGA.event({
                category: 'User',
                action: `Analytics Dialog Upsell Shown`,
                label: `Funnel`,
              });
              setIsDialogShown(true);
            }}
          />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            border: 1px solid black;
            border-radius: 10px;
            width: 13%;
            padding: 15px;
            min-height: 600px;
            max-height: 600px;
          }
          .header {
            font-weight: bold;
            padding-bottom: 10px;
          }
          .row {
            padding-top: 10px;
            padding-bottom: 10px;
          }
          .item {
            margin-left: 20px;
            font-weight: bold;
            cursor: pointer;
          }
          .item-selected {
            margin-left: 20px;
            font-weight: bold;
            border-bottom: 2px solid rgba(${colors.primaryGreen}, 1);
            cursor: pointer;
          }
          .more-button {
            max-width: 10px;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              width: 100%;
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

SidePanel.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelect: PropTypes.func,
};

SidePanel.defaultProps = {
  onCategorySelect: () => {},
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
      <div className="header">
        <h1>Analytics</h1>
        <LinkTelegram />
      </div>
      <div className="container">
        {categories && (
          <SidePanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={category => setSelectedCategory(category)}
          />
        )}
        {charts && (
          <div className="charts">
            {selectedCategory === 'All'
              ? charts.map(chart =>
                  !loginCtx.isLoggedIn && chart.reg_wall ? (
                    <div
                      className="placeholder"
                      style={{ width: SIZE_MAPPINGS[chart.type] }}
                      onClick={() => {
                        loginCtx.setPostRegisterViaAnalyticsUrl('/analytics');
                        router.push('/register');
                      }}
                      onKeyDown={() => {
                        loginCtx.setPostRegisterViaAnalyticsUrl('/analytics');
                        router.push('/register');
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={IMAGE_SOURCES[chart.type]}
                        className="blurred-image"
                        width="100%"
                        height="470px"
                        alt="blurred bgr"
                      />
                      <div className="blurred-image-text">
                        Sign up for this Analytic and more!
                        <img
                          src="static/png/logo_mobile.png"
                          className="logo"
                          alt="TokenAnalyst logo"
                        />
                      </div>
                    </div>
                  ) : (
                    <iframe
                      title="analytics-charts"
                      src={chart.url}
                      width={
                        window.matchMedia(
                          '(min-width: 320px) and (max-width: 767px)'
                        ).matches
                          ? '100%'
                          : SIZE_MAPPINGS[chart.type]
                      }
                      height="475px"
                      frameBorder="0"
                      className="chart"
                    />
                  )
                )
              : charts
                  .filter(chart => chart.category === selectedCategory)
                  .map(chart =>
                    !loginCtx.isLoggedIn && chart.reg_wall ? (
                      <div
                        className="placeholder"
                        style={{ width: SIZE_MAPPINGS[chart.type] }}
                        onClick={() => {
                          loginCtx.setPostRegisterViaAnalyticsUrl('/analytics');
                          router.push('/register');
                        }}
                        onKeyDown={() => {
                          loginCtx.setPostRegisterViaAnalyticsUrl('/analytics');
                          router.push('/register');
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <img
                          src={IMAGE_SOURCES[chart.type]}
                          className="blurred-image"
                          width="100%"
                          height="470px"
                          alt="blurred-bgr"
                        />
                        <div className="blurred-image-text">
                          Sign up for this Analytic and more!
                          <img
                            src="static/png/logo_mobile.png"
                            alt="TokenAnalyst logo"
                            className="logo"
                          />
                        </div>
                      </div>
                    ) : (
                      <iframe
                        title="analytics-charts"
                        src={chart.url}
                        width={SIZE_MAPPINGS[chart.type]}
                        height="475px"
                        frameBorder="0"
                        className="chart"
                      />
                    )
                  )}
          </div>
        )}
      </div>
      <style jsx>
        {`
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .container {
            display: flex;
            justify-content: space-between;
          }
          .charts {
            width: 86%;
            display: flex;
            flex-wrap: wrap;
          }
          .chart {
            border: 1px solid black;
            border-radius: 10px;
          }
          .placeholder {
            border: 1px solid black;
            border-radius: 10px;
            position: relative;
            cursor: pointer;
          }
          .blurred-image {
            filter: blur(4px);
          }
          .blurred-image-text {
            position: absolute;
            left: 25%;
            top: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
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
          }
        `}
      </style>
    </>
  );
};
