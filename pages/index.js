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
        {tokenSnapshotWidgetData && ioTableData ? (
          <>
            <TokenSnapshotWidget
              data={tokenSnapshotWidgetData}
              dataWindow={dataWindow}
              units={units}
            />
            <div className="table">
              <IoTable
                data={ioTableData}
                dataWindow={dataWindow}
                units={units}
              />
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <style jsx>{underSubNav}</style>
      <style jsx>{`
        .table {
          margin-left: 40px;
          margin-right: 40px;
        }
        @media only screen and (max-width: 768px) {
          .table {
            margin-left: 5px;
            margin-right: 5px;
          }
        }
      `}</style>
    </>
  );
};

export default Exchange;
