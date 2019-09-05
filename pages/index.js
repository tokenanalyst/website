import React, { useState } from "react";

import { IoTable } from "../components/tables/IoTable";
import { FilterNav } from "../components/navs";
import { DATA_WINDOWS, UNITS } from "../constants/filters";
import { underSubNav } from "../constants/styles/common-styled-jsx";
import { TokenSnapshotWidget } from "../components/widgets/TokenSnapshotWidget";
import { useApi } from "../custom-hooks";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Exchange = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[2]);
  const [units, setUnits] = useState(UNITS[0]);
  const tokenSnapshotWidgetData = useApi(
    "/api/latest-exchange-flows?tokens=BTC,ETH,USDC,DAI"
  );
  const ioTableData = useApi("/api/exchange-io");
  return (
    <>
      <FilterNav
        dataWindow={dataWindow}
        setDataWindow={setDataWindow}
        units={units}
        setUnits={setUnits}
      />
      <div className="under-sub-nav">
        <>
          <div className="section-header">At a glance</div>
          {tokenSnapshotWidgetData ? (
            <TokenSnapshotWidget
              data={tokenSnapshotWidgetData}
              dataWindow={dataWindow}
              units={units}
            />
          ) : (
            <div className="spinner">
              <LoadingSpinner />
            </div>
          )}
          <div className="section-header">{dataWindow} Inflows/Outflows</div>
          <div className="table">
            {ioTableData ? (
              <IoTable
                data={ioTableData}
                dataWindow={dataWindow}
                units={units}
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </>
      </div>
      <style jsx>{underSubNav}</style>
      <style jsx>{`
        .table {
          margin-left: 5px;
          margin-right: 5px;
        }
        .section-header {
          font-family: Space Grotesk;
          font-size: 22px;
          font-weight: bold;
          opacity: 0.4;
          padding-bottom: 20px;
          padding-top: 20px;
          padding-left: 10px;
        }
        .spinner {
          height: 296px;
        }
        @media only screen and (max-width: 768px) {
          .table {
            margin-left: 5px;
            margin-right: 5px;
          }
          .section-header {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Exchange;
