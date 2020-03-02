import React, { useState } from 'react';
import Head from 'next/head';

import { IoTable } from '../components/tables/IoTable';
import { FilterNav } from '../components/atomic/organism/FilterNav';
import { DATA_WINDOWS, UNITS } from '../constants/filters';
import { underSubNav } from '../constants/styles/common-styled-jsx';
import { useApi } from '../hooks';
import { LoadingSpinner } from '../components/atomic/atoms/LoadSpinner';
import { filterTable } from '../components/tables/IoTable/helpers';

const Exchange = () => {
  const [dataWindow, setDataWindow] = useState(DATA_WINDOWS[0]);
  const [units, setUnits] = useState(UNITS[0]);
  const ioTableData = useApi('/api/exchange-io');

  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Latest On-Chain Flows</title>
      </Head>
      <div className="container">
        <div className="filter-nav">
          <FilterNav
            dataWindow={dataWindow}
            setDataWindow={setDataWindow}
            units={units}
            setUnits={setUnits}
          />
        </div>

        <div className="under-sub-nav">
          <h2>{`${dataWindow} Exchanges Inflows/Outflows`}</h2>
          <div className="table">
            {ioTableData ? (
              <IoTable
                data={filterTable(ioTableData)}
                dataWindow={dataWindow}
                units={units}
              />
            ) : (
              <div className="spinner">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{underSubNav}</style>
      <style jsx>
        {`
          .container {
            margin-right: 10px;
            margin-left: 10px;
          }
          .filter-nav {
            margin-right: -10px;
            margin-left: -10px;
          }
          .table {
            margin-left: 5px;
            margin-right: 5px;
          }
          h2 {
            font-family: Space Grotesk;
            font-size: 22px;
            font-weight: bold;
            opacity: 0.4;
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
        `}
      </style>
    </>
  );
};

export default Exchange;
