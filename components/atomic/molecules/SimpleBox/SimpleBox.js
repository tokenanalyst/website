import PropTypes from 'prop-types';
import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

export const SimpleBox = ({ title, children }) => {
  return (
    <div className="container">
      <div className="box">
        <div className="title-container">
          <span className="title-text">{title}</span>
        </div>
        <div className="content">{children}</div>
      </div>
      <style jsx>
        {`
          .container {
            padding-bottom: 15px;
          }
          .box {
            border-radius: 3px;
            box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15),
              0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
            background-color: #ffffff;
            padding-top: 0px;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 10px;
          }
          .title-container {
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            -webkit-letter-spacing: 0.22px;
            -moz-letter-spacing: 0.22px;
            -ms-letter-spacing: 0.22px;
            letter-spacing: 0.22px;
            color: #000000;
             {
              /* border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: #35caab; */
            }
            margin-left: -10px;
            margin-right: -10px;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 10px;
            padding-right: 10px;
            background-color: #e8e8e8;
          }
          .title-text {
            opacity: 0.75;
            font-size: 12px;
            font-family: Inter, 'Helvetica Neue', system-ui, sans-serif;
          }
          .content {
            margin-top: 10px;
          }

          @media (min-width: 320px) and (max-width: 767px) {
          }
        `}
      </style>
    </div>
  );
};

SimpleBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
