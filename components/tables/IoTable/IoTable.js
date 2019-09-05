import React from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import ReactGA from "react-ga";
import "../../../node_modules/react-table/react-table.css";

import { AmountCell, ChangeCell, ExchangeCell, HeaderCell } from "./renderers";
import { getIoTableData } from "../../../data-transformers/tables";
import { filterCaseInsensitive } from "../helpers";
import { colors } from "../../../constants/styles/colors";
import { NextButton } from "./ui/NextButton";

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

  const RenderPreviousButton = props => {
    console.log(props);
    return <div onClick={props.onClick}>Previous</div>;
  };

  return (
    <div className="container">
      {data && (
        <ReactTable
          PreviousComponent={RenderPreviousButton}
          NextComponent={NextButton}
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
              ReactGA.event({
                category: "User",
                action: `Select IO table value ${token} ${exchange}`,
                label: `IO table select`
              });
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
          getTheadFilterProps={() => ({
            onKeyUp: e =>
              ReactGA.event({
                category: "User",
                action: `Filter IO table - Chars: ${e.target.value}`,
                label: `IO table filter`
              })
          })}
          getTheadThProps={(state, row, column) => {
            return {
              style: {
                border: "none"
              },
              onMouseUp: () => {
                ReactGA.event({
                  category: "User",
                  action: `Sort IO table: ${column.id}`,
                  label: `IO table sort`
                });
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
              color: `rgba(${colors.primaryGreen}, 1)`,
              boxShadow: "none",
              border: "none"
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
          font-family: Open Sans;
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
