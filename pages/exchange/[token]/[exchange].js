import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";

import { useApi } from "../../../custom-hooks";

const Chart = dynamic(() => import("../../../components/Chart"), {
  ssr: false
});

const Exchange = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    const getApiResult = async () => {
      console.log(router.query);
      const apiResult = await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${router.query.token.toLowerCase()}_${
          router.query.exchange
        }_outflow_txn_count_30day_v5&format=json`
      );
      setData(apiResult.data);

      const apiResult2 = await axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${router.query.token.toLowerCase()}_${
          router.query.exchange
        }_inflow_txn_count_30day_v5&format=json`
      );
      setData2(apiResult2.data);
    };

    getApiResult();
  }, []);

  return (
    <>
      <div>
        <div className="top-banner">Exchange</div>
        <div className="container">
          <div className="item">
            <div className="chart">
              <div className="header">Number of Senders</div>
              {data && data2 && (
                <Chart
                  title1="Inflow"
                  data={data.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                  title2="Outflow"
                  data2={data2.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                />
              )}
            </div>
          </div>
          <Separator />
          <div className="item">
            <div className="chart">
              <div className="header">Number of Transactions</div>
              {data && data2 && (
                <Chart
                  title1="Inflow"
                  data={data.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                  title2="Outflow"
                  data2={data2.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                />
              )}
            </div>
          </div>
          <Separator />
          <div className="item">
            <div className="chart">
              <div className="header">Average value of Transactions (BTC)</div>
              {data && data2 && (
                <Chart
                  title1="Inflow"
                  data={data.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                  title2="Outflow"
                  data2={data2.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                />
              )}
            </div>
          </div>
          <Separator />
          <div className="item">
            <div className="chart">
              <div className="header">Average value of Transactions (USD)</div>
              {data && data2 && (
                <Chart
                  title1="Inflow"
                  data={data.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                  title2="Outflow"
                  data2={data2.map(d => ({
                    time: d.date,
                    value: d.number_of_txns
                  }))}
                />
              )}
            </div>
          </div>
        </div>
        <div className="sub-container">
          <div className="chart">
            <div className="header">Inflow / Outflow</div>
            {data && data2 && (
              <Chart
                title1="Inflow"
                data={data.map(d => ({
                  time: d.date,
                  value: d.number_of_txns
                }))}
                title2="Outflow"
                data2={data2.map(d => ({
                  time: d.date,
                  value: d.number_of_txns
                }))}
                width={1400}
                height={300}
              />
            )}
            {console.log(data2)}
          </div>
        </div>
        <style jsx>{`
          .container {
            font-family: Space Grotesk;
            padding: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .sub-container {
            font-family: Space Grotesk;
            padding: 20px;
            display: flex;
            flex-direction: flex-center;
            justify-content: space-around;
          }
          .item {
            padding: 20px;
          }
          .chart {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-weight: bold;
          }
          .header {
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 20px;
          }
          @media only screen and (max-width: 768px) {
            .container {
              padding: 10px;
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Exchange;

const Separator = () => (
  <div className="separator">
    <style jsx>{`
      .separator {
        border: solid 0.5px rgba(151, 151, 151, 0.15);
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      @media only screen and (max-width: 768px) {
        .separator {
          visibility: hidden;
        }
      }
    `}</style>
  </div>
);
