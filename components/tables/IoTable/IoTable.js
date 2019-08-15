import React, { useState, useMemo } from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import "../../../node_modules/react-table/react-table.css";

import { AmountCell, ChangeCell, ExchangeCell, HeaderCell } from "./renderers";
import { TABLE_DATA } from "./data";
import { filterCaseInsensitive } from "./helpers";

export const IoTable = ({ data, dataWindow, units }) => {
  const router = useRouter();
  const [columns, setColumns] = useState([]);

  useMemo(() => {
    setColumns([
      {
        Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.exchange} />,
        accessor: TABLE_DATA.accessors.exchange,
        Cell: ({ value }) => <ExchangeCell value={value} />
      },
      {
        Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.token} />,
        accessor: TABLE_DATA.accessors.token
      },
      {
        Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.inflow} />,
        accessor: TABLE_DATA.accessors[units].inflow,
        Cell: ({ value }) => <AmountCell value={value} units={units} />,
        filterable: false
      },
      {
        Header: () => (
          <HeaderCell value={TABLE_DATA.columnHeaders.inflowChange} />
        ),
        accessor: TABLE_DATA.accessors[units].inflowChange,
        Cell: ({ value }) => <ChangeCell value={value} />,
        filterable: false
      },
      {
        Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.outflow} />,
        accessor: TABLE_DATA.accessors[units].outflow,
        Cell: ({ value }) => <AmountCell value={value} units={units} />,
        filterable: false
      },
      {
        Header: () => (
          <HeaderCell value={TABLE_DATA.columnHeaders.outflowChange} />
        ),
        accessor: TABLE_DATA.accessors[units].outflowChange,
        Cell: ({ value }) => <ChangeCell value={value} />,
        filterable: false
      }
    ]);
  }, units);

  return (
    <div className="container">
      <div className="information-header">
        <span>{dataWindow} Inflows/Outflows</span>
        <span className="information-icon">
          <img src="/static/svg/information.svg" />
        </span>
      </div>
      {data && (
        <ReactTable
          data={data.filter(datum => datum.window === dataWindow)}
          columns={columns}
          defaultSorted={[
            { id: TABLE_DATA.accessors[units].inflow, desc: true }
          ]}
          noDataText="No results"
          className="-highlight"
          defaultPageSize={25}
          getTrProps={(_, rowInfo) => ({
            onClick: () => {
              const { token, exchange } = rowInfo.original;
              router.push(
                `/exchange/[token]/[exchange]`,
                `/exchange/${token}/${exchange}`
              );
            }
          })}
          filterable={true}
          defaultFilterMethod={filterCaseInsensitive}
          style={{ cursor: "pointer" }}
        />
      )}

      <style jsx>{`
        .container {
          font-family: Work Sans;
        }
        .information-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
          padding: 30px 80px;
        }
        .information-icon {
          opacity: 0.2;
        }
        @media only screen and (max-width: 768px) {
          .information-header {
            padding: 30px 30px;
          }
        }
      `}</style>
    </div>
  );
};
