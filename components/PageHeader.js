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
          flex: 1;
        }
        .right-element {
          flex: 1;
          text-align: right;
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
