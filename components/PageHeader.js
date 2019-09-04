import React from "react";
import PropTypes from "prop-types";

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
          padding: 30px;
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
  rightElement: PropTypes.node
};

PageHeader.defaultProps = {
  rightElement: <div />
};
