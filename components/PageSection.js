import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";

export const PageSection = ({ text }) => {
  return (
    <div>
      <div className="page-section-container">
        <div className="page-section-text">
          {text} <Icon icon="chart" color="gray" />
        </div>
      </div>
      <style jsx>{`
        .page-section-container {
          font-family: Space Grotesk;
          display: flex;
          padding-bottom: 20px;
        }
        .page-section-text {
          font-size: 22px;
          font-weight: bold;
          text-align: left;
          opacity: 0.4;
          flex: 1;
        }
        .page-section-right-element {
          flex: 1;
          text-align: right;
        }
        @media only screen and (max-width: 768px) {
        }
      `}</style>
    </div>
  );
};

PageSection.propTypes = {
  text: PropTypes.string,
  rightElement: PropTypes.node
};
