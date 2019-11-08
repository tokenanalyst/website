import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactGA from 'react-ga';

import { colors } from '../constants/styles/colors';
import { CTALink } from '../components/widgets/ProChartWidget/CTALink';
import { ButtonMarketing } from '../components/ButtonMarketing';
import { SimpleDialog } from '../components/SimpleDialog';

const BIG = 'BIG';
const MED = 'MED';
const SML = 'SML';

const SIZE_MAPPINGS = {
  [BIG]: '100%',
  [MED]: '50%',
  [SML]: '33%',
};

const SidePanel = ({ categories, selectedCategory, onCategorySelect }) => {
  const router = useRouter();
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
          <img src="/static/svg/marketing/man_chilling.svg" className="image" />
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
      <style jsx>{`
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
          }
        }
      `}</style>
    </>
  );
};

SidePanel.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategorySelect: PropTypes.func,
};

const Analytics = () => {
  const [charts, setCharts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  return (
    <>
      <div className="header">
        <h1>Analytics</h1>
        <CTALink />
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
              ? charts.map(chart => (
                  <iframe
                    src={chart.url}
                    width={SIZE_MAPPINGS[chart.type]}
                    height="475px"
                    frameBorder="0"
                    className="chart"
                  ></iframe>
                ))
              : charts
                  .filter(chart => chart.category === selectedCategory)
                  .map(chart => (
                    <iframe
                      src={chart.url}
                      width={SIZE_MAPPINGS[chart.type]}
                      height="475px"
                      frameBorder="0"
                      className="chart"
                    ></iframe>
                  ))}
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
          }
          .chart {
            border: 1px solid black;
            border-radius: 10px;
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

export default Analytics;
