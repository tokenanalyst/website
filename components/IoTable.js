import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import "../node_modules/react-table/react-table.css";

import axios from "axios";

const DATA_WINDOWS = ["24h", "7d", "30d"];

export function IoTable() {
  const router = useRouter();
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
      Header: () => <span style={{ fontWeight: "bold" }}>Exchange</span>,
      accessor: "exchange"
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Token</span>,
      accessor: "token"
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Inflow</span>,
      accessor: "inflow_sum",
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          ${value || "0"}
        </span>
      )
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Inflow Change</span>,
      accessor: "inflow_sum_pct_change",
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          {value || "0.00"}%
        </span>
      )
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Outflow</span>,
      accessor: "outflow_sum",
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          ${value || "0"}
        </span>
      )
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Outflow Change</span>,
      accessor: "outflow_sum_pct_change",
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          {value || "0.00"}%
        </span>
      )
    }
  ];

  return (
    <div>
      <div className="data-window-container">
        <div className="data-window-title">
          {dataWindow} Exchange On-chain Inflows/Outflows
        </div>
        <div className="data-windows">
          {DATA_WINDOWS.map(dw => (
            <span className="data-window" onClick={() => setDataWindow(dw)}>
              <span
                className={
                  dw === dataWindow
                    ? "data-window-active"
                    : "data-window-inactive"
                }
              >
                {dw.toUpperCase()}
              </span>
            </span>
          ))}
        </div>
      </div>
      <ReactTable
        data={data.filter(datum => datum.window === dataWindow)}
        columns={columns}
        defaultSorted={[{ id: "inflow_sum", desc: true }]}
        noDataText="Loading data..."
        className="-highlight"
        defaultPageSize={25}
        getTrProps={(_, rowInfo) => {
          return {
            onClick: () => {
              const { token, exchange } = rowInfo.original;
              router.push(`/exchange/${token}/${exchange}`);
            }
          };
        }}
      />

      <style jsx>{`
        .data-window-container {
          padding: 10px;
        }
        .data-window-title {
          padding-bottom: 10px;
        }
        .data-windows {
          display: flex;
          justify-content: space-around;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .data-window {
          font-weight: bold;
          padding-left: 5px;
          padding-right: 5px;
          cursor: pointer;
        }
        .data-window-active {
          opacity: 1;
        }
        .data-window-inactive {
          opacity: 0.2;
        }
      `}</style>
    </div>
  );
}
