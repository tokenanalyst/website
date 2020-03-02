import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';

export const PreviousButton = ({ onClick, disabled }) => {
  return (
    <>
      <div className="container">
        <div className="icon" onClick={disabled ? () => null : onClick}>
          <Icon icon="chevron-left" iconSize={18} />
        </div>
        <div className="text" onClick={disabled ? () => null : onClick}>
          PREVIOUS
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            height: 100%;
            width: 100px;
            opacity: ${disabled ? 0.1 : 1};
          }
          .text {
            color: black;
            font-size: 14px;
          }
          .text:hover {
            text-decoration: underline;
          }
          .icon {
            padding-right: 20px;
          }
          @media only screen and (max-width: 768px) {
            .container {
              display: flex;
              align-items: center;
              height: 100%;
              width: 20px;
              opacity: ${disabled ? 0.1 : 1};
            }
            .text {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
};

PreviousButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
