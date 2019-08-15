import React, { useState } from "react";

import { IoTable } from "../components/tables/IoTable";
import { FilterNav } from "../components/navs";
import { DATA_WINDOWS, UNITS } from "../constants/filters";
import { underSubNav } from "../constants/styles/common-styled-jsx";
import { TokenSnapshotWidget } from "../components/widgets/TokenSnapshotWidget";
import { useApi } from "../custom-hooks";

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
        <TokenSnapshotWidget
          data={tokenSnapshotWidgetData}
          dataWindow={dataWindow}
        />
        <IoTable data={ioTableData} dataWindow={dataWindow} units={units} />
      </div>
      <style jsx>{underSubNav}</style>
    </>
  );
};

export default Exchange;
