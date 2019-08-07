import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import numeral from "numeral";
import "../node_modules/react-table/react-table.css";

import axios from "axios";

const ACCESSORS = {
  USD: {
    inflow: "inflow_usd_sum",
    inflowChange: "inflow_usd_sum_pct_change",
    outflow: "outflow_usd_sum",
    outflowChange: "outflow_usd_sum_pct_change"
  },
  BTC: {
    inflow: "inflow_sum",
    inflowChange: "inflow_sum_pct_change",
    outflow: "outflow_sum",
    outflowChange: "outflow_sum_pct_change"
  }
};

const coinImages = {
  Binance: "binance.png",
  Bitfinex: "bitfinex.png",
  Bitmex: "bitmex.png",
  Bitstamp: "bitstamp.png",
  Bittrex: "bittrex.png",
  Kraken: "kraken.png",
  Kucoin: "kucoin.png",
  Poloniex: "poloniex.png"
};

export function IoTable({ dataWindow, units }) {
  const router = useRouter();
  const [data, setData] = useState([]);

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
      accessor: "exchange",
      Cell: ({ value }) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ height: "16px", width: "16px", paddingRight: "5px" }}
            src={`/static/png/${coinImages[value]}`}
          />
          {value}
        </span>
      )
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Token</span>,
      accessor: "token"
    },
    {
      Header: () => <span style={{ fontWeight: "bold" }}>Inflow</span>,
      accessor: ACCESSORS[units].inflow,
      Cell: ({ value }) => (
        <span>
          {units === "USD" ? "$" : ""}
          {numeral(value).format("0,0") || "0"}
        </span>
      ),
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
      Cell: ({ value }) => (
        <span>
          {units === "USD" ? "$" : ""}
          {numeral(value).format("0,0") || "0"}
        </span>
      )
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
      <div className="information-header">
        <span>{dataWindow} Inflows/Outflows</span>
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
          padding-top: 30px;
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
        @media only screen and (max-width: 600px) {
          .information-header {
            padding: 30px 30px;
          }
        }
      `}</style>
    </div>
  );
}
