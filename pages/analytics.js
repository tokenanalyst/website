import React, { useState } from 'react';

import { colors } from '../constants/styles/colors';

const BIG = 'BIG';
const MED = 'MED';
const SML = 'SML';

const ALL = 'All';
const BITCOIN = 'Bitcoin';
const ETHEREUM = 'Ethereum';
const OTHER = 'Other';

const SIZE_MAPPINGS = {
  [BIG]: '100%',
  [MED]: '50%',
  [SML]: '33%',
};

const CHARTS = [
  {
    type: BIG,
    category: BITCOIN,
    url: 'https://ta-plotly-dash.herokuapp.com/charts/volume',
  },
  {
    type: MED,
    category: ETHEREUM,
    url: 'https://ta-plotly-dash.herokuapp.com/charts/volume',
  },
  {
    type: SML,
    category: OTHER,
    url: 'https://ta-plotly-dash.herokuapp.com/charts/volume',
  },
  {
    type: MED,
    category: BITCOIN,
    url: 'https://ta-plotly-dash.herokuapp.com/charts/volume',
  },
  {
    type: SML,
    category: BITCOIN,
    url: 'https://ta-plotly-dash.herokuapp.com/charts/volume',
  },
  {
    type: SML,
    category: ETHEREUM,
    url: 'https://ta-plotly-dash.herokuapp.com/charts/volume',
  },
];

const SidePanel = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <>
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
      </div>
      <style jsx>{`
        .container {
          border: 1px solid black;
          border-radius: 10px;
          width: 12%;
          padding: 15px;
          max-height: 200px;
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
      `}</style>
    </>
  );
};

const Analytics = () => {
  const [selectedCategory, setSelectedCategory] = useState('Bitcoin');

  return (
    <>
      <h1>Analytics</h1>
      <div className="container">
        <SidePanel
          categories={[ALL, BITCOIN, ETHEREUM, OTHER]}
          selectedCategory={selectedCategory}
          onCategorySelect={category => setSelectedCategory(category)}
        />
        <div className="charts">
          {selectedCategory === ALL
            ? CHARTS.map(chart => (
                <iframe
                  src={chart.url}
                  width={SIZE_MAPPINGS[chart.type]}
                  height="500px"
                  frameborder="0"
                ></iframe>
              ))
            : CHARTS.filter(chart => chart.category === selectedCategory).map(
                chart => (
                  <iframe
                    src={chart.url}
                    width={SIZE_MAPPINGS[chart.type]}
                    height="500px"
                    frameborder="0"
                  ></iframe>
                )
              )}
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: space-between;
          }
          .charts {
            width: 86%;
          }
        `}
      </style>
    </>
  );
};

export default Analytics;
