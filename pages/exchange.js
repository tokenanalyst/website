import React, { useState } from "react";

import { IoTable } from "../components/tables/IoTable/IoTable";
import { SubNav } from "../components/SubNav";
import { DATA_WINDOWS, UNITS } from "../constants/filters";

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
      <IoTable dataWindow={dataWindow} units={units} />
    </>
  );
};

export default Exchange;
