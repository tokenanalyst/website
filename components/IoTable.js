import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import "../node_modules/react-table/react-table.css";

import axios from "axios";

const DATA_WINDOWS = ["24h", "7d", "30d"];
const ACCESSORS = {
  usd: {
    inflow: "inflow_usd_sum",
    inflowChange: "inflow_usd_sum_pct_change",
    outflow: "outflow_usd_sum",
    outflowChange: "outflow_usd_sum_pct_change"
  },
  crypto: {
    inflow: "inflow_sum",
    inflowChange: "inflow_sum_pct_change",
    outflow: "outflow_sum",
    outflowChange: "outflow_sum_pct_change"
  }
};

export function IoTable() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [dataWindow, setDataWindow] = useState("24h");
  const [units, setUnits] = useState("usd");

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
      accessor: ACCESSORS[units].inflow,
      Cell: ({ value }) => <span>${value || "0"}</span>,
      filterable: false
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Inflow Change</span>,
      accessor: ACCESSORS[units].inflowChange,
      filterable: false,
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          {value || "0.00"}%
        </span>
      )
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Outflow</span>,
      accessor: ACCESSORS[units].outflow,
      filterable: false,
      Cell: ({ value }) => <span>${value || "0"}</span>
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Outflow Change</span>,
      accessor: ACCESSORS[units].outflowChange,
      filterable: false,
      Cell: ({ value }) => (
        <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
          {value || "0.00"}%
        </span>
      )
    }
  ];

  const filterCaseInsensitive = ({ id, value }, row) =>
    row[id] ? row[id].toLowerCase().includes(value.toLowerCase()) : true;

  return (
    <div className="container">
      <div className="data-window-container">
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
      <div className="information-header">
        <span>{dataWindow} Exchange On-chain Inflows/Outflows</span>
        <span className="information-icon">
          <img src="/static/svg/information.svg" />
        </span>
      </div>
      <ReactTable
        data={data.filter(datum => datum.window === dataWindow)}
        columns={columns}
        defaultSorted={[{ id: ACCESSORS[units].inflow, desc: true }]}
        noDataText="No results"
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
        filterable={true}
        defaultFilterMethod={filterCaseInsensitive}
      />

      <style jsx>{`
        .container {
          margin: 20px;
        }
        .information-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          padding: 30px 80px;
        }
        .information-icon {
          opacity: 0.2;
        }
        .data-window-container {
          padding: 10px;
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
        @media only screen and (max-width: 600px) {
          .information-header {
            padding: 30px 30px;
          }
        }
      `}</style>
    </div>
  );
}
