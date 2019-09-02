import React from "react";
import PropTypes from "prop-types";

export const PageHeader = ({ text, rightElement }) => {
  return (
    <div>
      <div className="page-header-container">
        <div className="page-header-text">{text}</div>
        <div className="page-header-right-element">{rightElement}</div>
      </div>
      <style jsx>{`
        .page-header-container {
          font-family: Space Grotesk;
          display: flex;
          padding: 30px;
        }
        .page-header-text {
          font-size: 32px;
          font-weight: bold;
          text-align: left;
          flex: 1;
        }
        .page-header-right-element {
          flex: 1;
          text-align: right;
        }
        @media only screen and (max-width: 768px) {
        }
      `}</style>
    </div>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string,
  rightElement: PropTypes.node
};
