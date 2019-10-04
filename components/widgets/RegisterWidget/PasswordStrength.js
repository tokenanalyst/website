import PropTypes from 'prop-types';
import React from 'react';

import { SimpleProgressBar } from '../../SimpleProgressBar';
import { Intent } from '../../../constants/styles/colors';

export const PasswordStrength = ({ score }) => {
  // TODO: agree on a common set of colors

  const scoreLevel = [
    {
      text: 'Weak',
      style: '(255, 115, 115)',
      intent: Intent.DANGER,
    },
    {
      text: 'Weak',
      style: '(255, 115, 115)',
      intent: Intent.DANGER,
    },
    {
      text: 'Medium',
      style: '(255, 179, 102)',
      intent: Intent.WARNING,
    },
    {
      text: 'Strong',
      style: '(61, 204, 145)',
      intent: Intent.SUCCESS,
    },
    {
      text: 'Strong',
      style: '(61, 204, 145)',
      intent: Intent.SUCCESS,
    },
  ];

  return (
    <div className="container">
      <div className="level">
        <div>Password strength</div>
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
            color: rgba(${scoreLevel[score].style}}, 1);
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
