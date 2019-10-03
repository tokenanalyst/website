import PropTypes from 'prop-types';
import React from 'react';

import { SimpleProgressBar } from '../../SimpleProgressBar';
import { Intent } from '../../../constants/styles/colors';

export const PasswordStrength = ({ score }) => {
  // TODO: agree on a common set of colors

  const scoreLevel = {
    '0': {
      text: 'Weak',
      style: '#FF7373',
      intent: Intent.DANGER,
    },
    '1': {
      text: 'Weak',
      style: '#FF7373',
      intent: Intent.DANGER,
    },
    '2': {
      text: 'Medium',
      style: '#FFB366',
      intent: Intent.WARNING,
    },
    '3': {
      text: 'Strong',
      style: '#3DCC91',
      intent: Intent.SUCCESS,
    },
    '4': {
      text: 'Strong',
      style: '#3DCC91',
      intent: Intent.SUCCESS,
    },
  };

  return (
    <div className="container">
      <div className="level">
        <div>Password strenght</div>
        <div>{scoreLevel[score].text}</div>
      </div>
      <div className="bar">
        <SimpleProgressBar
          value={0.1 + score / 4}
          intent={scoreLevel[score].intent}
        />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
          }
          .level {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: ${scoreLevel[score].style}};
          }
          .bar {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

PasswordStrength.propTypes = {
  score: PropTypes.number.isRequired,
};
