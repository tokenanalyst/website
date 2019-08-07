import React, { useState, useEffect, useMemo } from "react";
import ReactTable from "react-table";
import { useRouter } from "next/router";
import numeral from "numeral";
import "../../node_modules/react-table/react-table.css";

import axios from "axios";

// TABLE DISPLAY AND ACCESSOR PROPERTIES

const TABLE_DATA = {
  accessors: {
    token: "token",
    exchange: "exchange",
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
  },
  columnHeaders: {
    exchange: "Exchange",
    token: "Token",
    inflow: "Inflow",
    inflowChange: "Inflow Change",
    outflow: "Outflow",
    outflowChange: "Outflow Change"
  }
};

const EXCHANGE_IMAGES = {
  Binance: "binance.png",
  Bitfinex: "bitfinex.png",
  Bitmex: "bitmex.png",
  Bitstamp: "bitstamp.png",
  Bittrex: "bittrex.png",
  Kraken: "kraken.png",
  Kucoin: "kucoin.png",
  Poloniex: "poloniex.png"
};

// CUSTOM REACT-TABLE CELL RENDERERS

const Header = ({ value }) => (
  <span style={{ fontWeight: "bold" }}>{value}</span>
);

const ExchangeCell = ({ value }) => (
  <span style={{ display: "flex", alignItems: "center" }}>
    <img
      style={{ height: "16px", width: "16px", paddingRight: "5px" }}
      src={`/static/png/${EXCHANGE_IMAGES[value]}`}
    />
    {value}
  </span>
);

const AmountCell = ({ value, units }) => (
  <span>
    {units === "USD" ? "$" : ""}
    {numeral(value).format("0,0") || "0"}
  </span>
);

const ChangeCell = ({ value }) => (
  <span style={{ color: value < 0 ? "#fa4e96" : "#3fcdab" }}>
    {value || "0.00"}%
  </span>
);

// REACT-TABLE DEFAULT SEARCH IS CASE-SENSITIVE AND DOESN'T USE SUBSTR, THIS FIXES IT

const filterCaseInsensitive = ({ id, value }, row) =>
  row[id] ? row[id].toLowerCase().includes(value.toLowerCase()) : true;

export const IoTable = ({ dataWindow, units }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  let columns;

  useEffect(() => {
    const getApiResult = async () => {
      const apiResult = await axios.get("/api/exchange-io");
      setData(apiResult.data.ta_response);
    };

    getApiResult();
  }, []);

  useMemo(() => {
    columns = [
      {
        Header: () => <Header value={TABLE_DATA.columnHeaders.exchange} />,
        accessor: TABLE_DATA.accessors["exchange"],
        Cell: ({ value }) => <ExchangeCell value={value} />
      },
      {
        Header: () => <Header value={TABLE_DATA.columnHeaders.token} />,
        accessor: TABLE_DATA.accessors["token"]
      },
      {
        Header: () => <Header value={TABLE_DATA.columnHeaders.inflow} />,
        accessor: TABLE_DATA.accessors[units].inflow,
        Cell: ({ value }) => <AmountCell value={value} units={units} />,
        filterable: false
      },
      {
        Header: () => <Header value={TABLE_DATA.columnHeaders.inflowChange} />,
        accessor: TABLE_DATA.accessors[units].inflowChange,
        Cell: ({ value }) => <ChangeCell value={value} />,
        filterable: false
      },
      {
        Header: () => <Header value={TABLE_DATA.columnHeaders.outflow} />,
        accessor: TABLE_DATA.accessors[units].outflow,
        Cell: ({ value }) => <AmountCell value={value} units={units} />,
        filterable: false
      },
      {
        Header: () => <Header value={TABLE_DATA.columnHeaders.outflowChange} />,
        accessor: TABLE_DATA.accessors[units].outflowChange,
        Cell: ({ value }) => <ChangeCell value={value} />,
        filterable: false
      }
    ];
  }, units);

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
        defaultSorted={[{ id: TABLE_DATA.accessors[units].inflow, desc: true }]}
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
};
