import React from "react";
import ReactTable from "react-table";
import "../../../node_modules/react-table/react-table.css";

import {
  AmountCell,
  ChangeCell,
  CoinCell,
  TransactionsCell,
  SupplyCell,
  HeaderCell
} from "./renderers";

export const StableCoinTable = ({ tableData }) => {
  const columns = [
    {
      Header: () => <HeaderCell value={tableData.columnHeaders.coin} />,
      accessor: tableData.accessors.coin,
      Cell: ({ value }) => <CoinCell value={value} />
    },
    {
      Header: () => <HeaderCell value={tableData.columnHeaders.volume} />,
      accessor: tableData.accessors.volume,
      Cell: ({ value }) => <AmountCell value={value} />,
      width: 125
    },
    {
      Header: () => <HeaderCell value={tableData.columnHeaders.volumeChange} />,
      accessor: tableData.accessors.volumeChange,
      Cell: ({ value }) => <ChangeCell value={value} />
    },
    {
      Header: () => <HeaderCell value={tableData.columnHeaders.transactions} />,
      accessor: tableData.accessors.transactions,
      Cell: ({ value }) => <TransactionsCell value={value} />,
      width: 80
    },
    {
      Header: () => (
        <HeaderCell value={tableData.columnHeaders.transactionsChange} />
      ),
      accessor: tableData.accessors.transactionsChange,
      Cell: ({ value }) => <ChangeCell value={value} />
    },
    {
      Header: () => <HeaderCell value={tableData.columnHeaders.supply} />,
      accessor: tableData.accessors.supply,
      Cell: ({ value }) => <SupplyCell value={value} />,
      width: 150
    }
  ];
  return (
    <>
      <div className="container">
        <ReactTable
          data={tableData.data}
          columns={columns}
          showPagination={false}
          defaultPageSize={6}
          defaultSorted={[{ id: tableData.accessors.volume, desc: true }]}
          className="-highlight"
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
                boxShadow: "0px",
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
              color: "#3fcdab"
            }
          })}
          getNoDataProps={() => ({
            style: {
              color: "#fa4e96"
            }
          })}
        />
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
        }
      `}</style>
    </>
  );
};
