import React from "react";
import ReactTable from "react-table";
import "../../../node_modules/react-table/react-table.css";

import {
  AmountCell,
  ChangeCell,
  CoinCell,
  TransactionsCell,
  SupplyCell
} from "./renderers";

export const StableCoinTable = ({ tableData }) => {
  const columns = [
    {
      Header: () => tableData.columnHeaders.coin,
      accessor: tableData.accessors.coin,
      Cell: ({ value }) => <CoinCell value={value} />
    },
    {
      Header: () => tableData.columnHeaders.volume,
      accessor: tableData.accessors.volume,
      Cell: ({ value }) => <AmountCell value={value} />,
      width: 125
    },
    {
      Header: () => tableData.columnHeaders.volumeChange,
      accessor: tableData.accessors.volumeChange,
      Cell: ({ value }) => <ChangeCell value={value} />
    },
    {
      Header: () => tableData.columnHeaders.transactions,
      accessor: tableData.accessors.transactions,
      Cell: ({ value }) => <TransactionsCell value={value} />,
      width: 80
    },
    {
      Header: () => tableData.columnHeaders.transactionsChange,
      accessor: tableData.accessors.transactionsChange,
      Cell: ({ value }) => <ChangeCell value={value} />
    },
    {
      Header: () => tableData.columnHeaders.supply,
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
          className="-highlight"
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
