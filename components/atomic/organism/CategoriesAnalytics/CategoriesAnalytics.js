import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';

import { colors } from '../../../../constants/styles/colors';
import { ButtonMarketing } from '../../molecules/ButtonMarketing';
import { SimpleDialog } from '../../atoms/SimpleDialog';
import { COOKIES } from '../../../../constants/cookies';

export const CategoresAnalytics = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const isProUser = () => Cookies.get(COOKIES.tier) < 1;

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
        {categories.map(category => (
          <div className="row" key={category}>
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
        {isProUser() && (
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
        )}
      </div>
      <style jsx>
        {`
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
            padding-top: 20px;
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
          }
          @media (min-width: 320px) and (max-width: 767px) {
            .container {
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>
    </>
  );
};

CategoresAnalytics.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onCategorySelect: PropTypes.func,
};

CategoresAnalytics.defaultProps = {
  selectedCategory: null,
  onCategorySelect: () => {},
};
