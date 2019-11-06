import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { colors } from '../constants/styles/colors';

const BIG = 'BIG';
const MED = 'MED';
const SML = 'SML';

const SIZE_MAPPINGS = {
  [BIG]: '100%',
  [MED]: '50%',
  [SML]: '33%',
};

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
  const [charts, setCharts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getCharts = async () => {
      const res = await axios.get(
        'https://ta-plotly-dash.herokuapp.com/chart-metadata'
      );
      setCharts(res.data.items);
      setCategories(res.data.categories);
      setSelectedCategory(res.data.categories[0]);
    };

    getCharts();
  }, []);

  return (
    <>
      <h1>Analytics</h1>
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
            {console.log(charts)}
            {selectedCategory === 'All'
              ? charts.map(chart => (
                  <iframe
                    src={chart.url}
                    width={SIZE_MAPPINGS[chart.type]}
                    height="500px"
                    frameBorder="0"
                  ></iframe>
                ))
              : charts
                  .filter(chart => chart.category === selectedCategory)
                  .map(chart => (
                    <iframe
                      src={chart.url}
                      width={SIZE_MAPPINGS[chart.type]}
                      height="500px"
                      frameBorder="0"
                    ></iframe>
                  ))}
          </div>
        )}
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
