import React, { useState } from "react";

import { IoTable } from "../components/tables/IoTable";
import { SubNav } from "../components/SubNav";
import { DATA_WINDOWS, UNITS } from "../constants/filters";
import { underSubNav } from "../bucket/styles/styles";

const Exchange = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[0]);
  const [units, setUnits] = useState(UNITS[0]);

  return (
    <div className="under-sub-nav">
      <SubNav
        dataWindow={dataWindow}
        setDataWindow={setDataWindow}
        units={units}
        setUnits={setUnits}
      />
      <IoTable dataWindow={dataWindow} units={units} />
      <style jsx>{underSubNav}</style>
    </div>
  );
};

export default Exchange;
