import React from 'react';
import PropTypes from 'prop-types';

export const PageSection = ({ text }) => {
  return (
    <>
      <div className="container">
        <div className="text">{text}</div>
      </div>
      <style jsx>
        {`
          .container {
            font-family: Space Grotesk;
            display: flex;
            padding: 5px;
            padding-bottom: 20px;
            padding-top: 20px;
          }
          .text {
            font-size: 22px;
            font-weight: bold;
            text-align: left;
            opacity: 0.4;
            flex: 1;
          }
        `}
      </style>
    </>
  );
};

PageSection.propTypes = {
  text: PropTypes.string.isRequired,
};

PageSection.defaultProps = {};
