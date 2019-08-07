import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "../node_modules/react-table/react-table.css";

import axios from "axios";

export function IoTable() {
  const [data, setData] = useState([]);
  const [dataWindow, setDataWindow] = useState("24h");

  useEffect(() => {
    const getApiResult = async () => {
      const apiResult = await axios.get("/api/exchange-io");
      setData(apiResult.data.ta_response);
    };

    getApiResult();
  }, []);

  const columns = [
    {
      Header: "Exchange",
      accessor: "exchange"
    },
    {
      Header: "Token",
      accessor: "token"
    },
    {
      Header: "Inflow",
      accessor: "inflow_sum"
    },
    {
      Header: "Inflow Change",
      accessor: "inflow_sum_pct_change",
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          {value}
        </span>
      )
    },
    {
      Header: "Outflow",
      accessor: "outflow_sum"
    },
    {
      Header: "Outflow Change",
      accessor: "outflow_sum_pct_change",
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div>
      <ReactTable
        data={data.filter(datum => datum.window === dataWindow)}
        columns={columns}
        defaultSorted={[{ id: "inflow_sum", desc: true }]}
        noDataText="Loading data..."
        className="-highlight"
        showPageSizeOptions={false}
        defaultPageSize={25}
      />

      <style jsx>{`
        .green {
          color: green;
          background-color: blue;
        }
      `}</style>
    </div>
  );
}
