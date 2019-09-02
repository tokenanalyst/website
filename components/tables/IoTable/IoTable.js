import React from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import "../../../node_modules/react-table/react-table.css";

import { AmountCell, ChangeCell, ExchangeCell, HeaderCell } from "./renderers";
import { getIoTableData } from "../../../data-transformers/tables";
import { filterCaseInsensitive } from "../helpers";
import { colors } from "../../../constants/styles/colors";

const TABLE_DATA = getIoTableData();

export const IoTable = ({ data, dataWindow, units }) => {
  const router = useRouter();

  const getColumns = units => [
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.exchange} />,
      accessor: TABLE_DATA.accessors.exchange,
      Cell: ({ value }) => <ExchangeCell value={value} />,
      width: 150
    },
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.token} />,
      accessor: TABLE_DATA.accessors.token
    },
    {
      Header: () => <HeaderCell value={TABLE_DATA.columnHeaders.inflow} />,
      accessor: TABLE_DATA.accessors[units].inflow,
      Cell: ({ value }) => <AmountCell value={value} units={units} />,
      filterable: false,
      width: 135
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
      filterable: false,
      width: 150
    },
    {
      Header: () => (
        <HeaderCell value={TABLE_DATA.columnHeaders.outflowChange} />
      ),
      accessor: TABLE_DATA.accessors[units].outflowChange,
      Cell: ({ value }) => <ChangeCell value={value} />,
      filterable: false
    }
  ];

  return (
    <div className="container">
      <div className="section-header">{dataWindow} Inflows/Outflows</div>
      {data && (
        <ReactTable
          data={data.filter(datum => datum.window === dataWindow)}
          columns={getColumns(units)}
          defaultSorted={[
            { id: TABLE_DATA.accessors[units].inflow, desc: true }
          ]}
          noDataText="No results"
          className="-highlight"
          defaultPageSize={25}
          filterable={true}
          defaultFilterMethod={filterCaseInsensitive}
          style={{ cursor: "pointer" }}
          getTrProps={(_, rowInfo) => ({
            onClick: () => {
              const { token, exchange } = rowInfo.original;
              router.push(
                `/exchange/[token]/[exchange]`,
                `/exchange/${token}/${exchange}`
              );
            },
            style: {
              border: "none"
            }
          })}
          getProps={() => ({
            style: {
              border: "none"
            }
          })}
          getTdProps={() => ({
            style: {
              border: "none"
            }
          })}
          getTheadThProps={() => {
            return {
              style: {
                border: "none"
              }
            };
          }}
          getTheadProps={() => {
            return {
              style: {
                boxShadow: "none",
                border: "none"
              }
            };
          }}
          getTableProps={() => ({
            style: {
              border: "none"
            }
          })}
          getPaginationProps={() => ({
            style: {
              color: `rgba(${colors.primaryGreen}, 1)`
            }
          })}
          getNoDataProps={() => ({
            style: {
              color: `rgba(${colors.primaryRed}, 1)`
            }
          })}
        />
      )}

      <style jsx>{`
        .container {
          font-family: Space Grotesk;
        }
        .section-header {
          font-size: 22px;
          font-weight: bold;
          opacity: 0.4;
          padding-bottom: 20px;
          padding-top: 20px;
          padding-left: 5px;
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
