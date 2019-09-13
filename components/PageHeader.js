import React from 'react';
import PropTypes from 'prop-types';

export const PageHeader = ({ text, rightElement }) => {
  return (
    <>
      <div className="container">
        <div className="text">{text}</div>
        <div className="right-element">{rightElement}</div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          padding: 15px;
          padding-top: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(151, 151, 151, 0.15);
          margin-bottom: 20px;
          margin-left: -10px;
          margin-right: -10px;
        }
        .text {
          font-size: 32px;
          font-weight: bold;
          text-align: left;
        }
        .right-element {
          text-align: right;
          margin-top: auto;
          margin-bottom: auto;
          margin-left: auto;
        }
        @media only screen and (max-width: 768px) {
          .container {
            font-family: Space Grotesk;
            display: flex;
            padding: 30px;
            flex-direction: column;
          }
          .text {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
          }
          .right-element {
            text-align: center;
            margin-top: 20px;
            margin-bottom: auto;
            margin-left: unset;
          }
        }
      `}</style>
    </>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  rightElement: PropTypes.node,
};

PageHeader.defaultProps = {
  rightElement: <div />,
};
