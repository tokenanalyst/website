import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";

export const NextButton = ({ onClick, disabled }) => {
  return (
    <>
      <div>
        <div className='text' onClick={onClick}>Next</div>
        <div className='icon'>
          <Icon icon="chevron-right" iconSize={20} />
        </div>
      </div>
      <style jsx>{`
        display: flex;
        align-items: center;
        height: 100%;
        .text {
        }
        .icon {
        }
        @media only screen and (max-width: 768px) {
        }
      `}</style>
    </>
  );
};

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};
