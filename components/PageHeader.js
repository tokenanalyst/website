import React from 'react';
import PropTypes from 'prop-types';

export const PageHeader = ({ text, rightElement }) => {
  return (
    <>
      <div className="container">
        <h1>{text}</h1>
        <div className="right-element">{rightElement}</div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          padding: 15px;
          padding-top: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(151, 151, 151, 0.15);
          margin-bottom: 20px;
          margin-left: -10px;
          margin-right: -10px;
        }
        h1 {
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

            flex-direction: column;
          }
          h1 {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            padding: 0px;
          }
          .right-element {
            text-align: center;
            margin-top: 20px;

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
