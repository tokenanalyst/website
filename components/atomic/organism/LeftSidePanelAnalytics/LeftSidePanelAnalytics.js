import PropTypes from 'prop-types';
import React from 'react';

import { LinkTelegram } from '../../molecules/LinkTelegram/LinkTelegram';
import { SimpleBox } from '../../molecules/SimpleBox';
import { CategoresAnalytics } from '../CategoriesAnalytics';

export const LeftSidePanelMetrics = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="container">
      <div className="cat">
        <LinkTelegram />
      </div>
      <div className="controls-container">
        <SimpleBox title="CATEGORY">
          <CategoresAnalytics
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
          />
        </SimpleBox>
      </div>
      <style jsx>
        {`
          .metrics {
            padding-top: 5px;
            padding-bottom: 15px;
          }
          .controls {
            flex-direction: column;
            display: flex;
          }
          .control {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .cat-link {
            padding-bottom: 10px;
          }
          .label {
            width: 50%;
            padding-bottom: 10px;
          }
          .legend-flows {
            padding-left: 8px;
          }
          .exchanges {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
          .cat {
            padding-top: 10px;
            padding-bottom: 10px;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .metrics {
              padding-bottom: 10px;
            }
            .controls {
              flex-direction: column;
            }
            .label {
              margin: auto;
            }
            .cat {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
};

LeftSidePanelMetrics.propTypes = {
  onCategorySelect: PropTypes.func,
  selectedCategory: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

LeftSidePanelMetrics.defaultProps = {
  selectedCategory: null,
  onCategorySelect: () => {},
};
