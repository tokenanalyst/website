import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";

export const PageSection = ({ text }) => {
  return (
    <>
      <div className="container">
        <div className="text">
          {text} <Icon icon="chart" color="gray" />
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          padding-bottom: 20px;
        }
        .text {
          font-size: 22px;
          font-weight: bold;
          text-align: left;
          opacity: 0.4;
          flex: 1;
        }
      `}</style>
    </>
  );
};

PageSection.propTypes = {
  text: PropTypes.string.isRequired,
  rightElement: PropTypes.node
};

PageSection.defaultProps = {
  rightElement: <div />
};
