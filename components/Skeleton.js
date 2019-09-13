import React from 'react';
import PropTypes from 'prop-types';

export const Skeleton = ({ isSkeleton, children }) => {
  return (
    <>
      <div className={isSkeleton ? 'skeleton' : ''}>{children}</div>
      <style jsx>{`
        .skeleton {
          margin: 2px;
          border-radius: 4px;
          animation: pulse 1s infinite ease-in-out;
          @keyframes pulse {
            0% {
              background-color: rgba(165, 165, 165, 0.1);
            }
            50% {
              background-color: rgba(165, 165, 165, 0.3);
            }
            100% {
              background-color: rgba(165, 165, 165, 0.1);
            }
          }
        }
      `}</style>
    </>
  );
};

Skeleton.propTypes = {
  isSkeleton: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Skeleton.defaultProps = {
  isSkeleton: false,
};
