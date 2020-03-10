import React from 'react';

export const Separator = () => (
  <div className="separator">
    <style jsx>
      {`
        .separator {
          border-right: solid 1px rgba(151, 151, 151, 0.15);
          margin-left: 20px;
          margin-right: 15px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        @media only screen and (max-width: 768px) {
          .separator {
            border-right: solid 1px rgba(151, 151, 151, 0.15);
            margin-left: 20px;
            margin-right: 15px;
            margin-top: 5px;
            margin-bottom: 5px;
            visibility: hidden;
          }
        }
      `}
    </style>
  </div>
);
