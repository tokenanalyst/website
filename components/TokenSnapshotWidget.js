import React from "react";

import { TokenSnapshot } from "./TokenSnapshot";

export const TokenSnapshotWidget = () => {
  return (
    <>
      <div className="container">
        <TokenSnapshot />
        <TokenSnapshot />
        <TokenSnapshot />
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          @media only screen and (max-width: 800px) {
            .container {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </>
  );
};
