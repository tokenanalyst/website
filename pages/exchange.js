import React, { useState } from "react";

import { IoTable } from "../components/tables/IoTable";
import { SubNav } from "../components/SubNav";
import { DATA_WINDOWS, UNITS } from "../constants/filters";
import { underSubNav } from "../bucket/styles/styles";
import { TokenSnapshotWidget } from "../components/TokenSnapshotWidget";

const Exchange = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[0]);
  const [units, setUnits] = useState(UNITS[0]);

  return (
    <>
      <SubNav
        dataWindow={dataWindow}
        setDataWindow={setDataWindow}
        units={units}
        setUnits={setUnits}
      />
      <div className="under-sub-nav">
        <TokenSnapshotWidget />
        <IoTable dataWindow={dataWindow} units={units} />
      </div>
      <style jsx>{underSubNav}</style>
    </>
  );
};

export default Exchange;
