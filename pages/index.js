import React, { useState } from "react";

import { IoTable } from "../components/tables/IoTable";
import { SubNav } from "../components/navs";
import { DATA_WINDOWS, UNITS } from "../constants/filters";
import { underSubNav } from "../constants/styles/common-styled-jsx";
import { TokenSnapshotWidget } from "../components/widgets/TokenSnapshotWidget";

const Exchange = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[2]);
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
        <TokenSnapshotWidget dataWindow={dataWindow} />
        <IoTable dataWindow={dataWindow} units={units} />
      </div>
      <style jsx>{underSubNav}</style>
    </>
  );
};

export default Exchange;
