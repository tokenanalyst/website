import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";

import { useApi } from "../../../custom-hooks";
import { EXCHANGE_IMAGES } from "../../../constants/image-paths";
import { route } from "next-server/dist/server/router";

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
        <div className="banner-container">
          <div className="banner-item">
            <img
              style={{ width: "40px", height: "40px" }}
              src={`/static/png/${EXCHANGE_IMAGES[router.query.exchange]}`}
            />
            <span className="banner-header">
              {router.query.exchange} [{router.query.token}]
            </span>
          </div>
          <Separator />
          <div className="banner-item">
            <div>
              <span className="flow-value">20.4M</span>
              <img src="/static/svg/up.svg" />
              <span className="flow-change-positive">20.6%</span>
            </div>
            <div>Inflow Volume Last 24h</div>
          </div>
          <Separator />
          <div className="banner-item">
            <div>
              <span className="flow-value">16.4M</span>
              <img src="/static/svg/down.svg" />
              <span className="flow-change-negative">-16.6%</span>
            </div>
            <div>Outflow Volume Last 24h</div>
          </div>
        </div>
        <div className="shadow" />
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
          <div className="shadow" />
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
          <div className="shadow" />
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
          <div className="shadow" />
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
          <div className="shadow" />
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
          .banner-container {
            border-bottom: solid 1px rgba(151, 151, 151, 0.15);
            padding-top: 40px;
            padding-bottom: 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          }
          .banner-item {
            font-family: Space Grotesk;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .banner-header {
            padding-left: 10px;
            font-size: 32px;
          }
          .flow-value {
            font-size: 24px;
            padding-right: 10px;
          }
          .flow-change-positive {
            padding-left: 5px;
            color: #0fd491;
          }
          .flow-change-negative {
            padding-left: 5px;
            color: #fa4e96;
          }
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
            .banner-container {
              flex-direction: column;
              border-bottom: none;
            }
            .shadow {
              height: 4px;
              box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.05);
              margin-left: -20px;
              margin-right: -20px;
            }
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
