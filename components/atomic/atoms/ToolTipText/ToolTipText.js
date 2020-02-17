import React from 'react';

export const TOOLTIP_TEXT = (
  <>
    <div>Below is the legend for each of the charts displayed:</div>
    <div>
      All units are displayed in terms of the selected asset except for the
      Price which is displayed in USD, USDT or appropriate stablecoin
    </div>
    <br />
    <div>
      1: Price of the selected asset on the selected exchange in either USD or
      USDT
    </div>
    <br />
    <div>
      2: Trading volume of the pair shown above on the selected exchange.
      Expressed in terms of the selected asset
    </div>
    <br />
    <div>
      3: Inflows and outflows of the selected asset into and out of the selected
      exchange on the blockchain
    </div>
    <br />
    <div>
      4: "Net" flows of the asset into the exchange on the blockchain. This is
      the sum of inflows minus the outflows
    </div>
    <div>
      Negative net flows mean more funds left the exchange than came in during
      the time interval and vice versa for positive net flows
    </div>
  </>
);
