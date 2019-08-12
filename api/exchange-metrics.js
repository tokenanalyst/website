import axios from "axios";
import url from "url";

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const token = urlParts.query.token;
  const exchange = urlParts.query.exchange;

  if (!token || !exchange) {
    res.status(400);
    res.send({ error: "Token and / or exchange missing" });
  } else {
    const [
      inflowTxnCountApiResponse,
      outflowTxnCountApiResponse,
      inflowAddressCountApiResponse,
      outflowAddressCountApiResponse,
      inflowAverageTxnValueResponse,
      outflowAverageTxnValueResponse,
      inflowTopTenTxnResponse,
      outflowTopTenTxnResponse
    ] = await Promise.all([
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_inflow_txn_count_30day_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_outflow_txn_count_30day_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_inflow_address_count_30day_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_outflow_address_count_30day_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_inflow_average_txn_value_30day_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_outflow_average_txn_value_30day_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_inflow_top10txns_24h_rolling_v5&format=json`
      ),
      axios.get(
        `https://api.tokenanalyst.io/analytics/last?job=${token.toLowerCase()}_${exchange}_outflow_top10txns_24h_rolling_v5&format=json`
      )
    ]);

    res.send({
      ta_response: {
        inflow: {
          txnCount: inflowTxnCountApiResponse.data,
          addressCount: inflowAddressCountApiResponse.data,
          averageTxnValue: inflowAverageTxnValueResponse.data,
          topTenTxns: inflowTopTenTxnResponse.data
        },
        outflow: {
          txnCount: outflowTxnCountApiResponse.data,
          addressCount: outflowAddressCountApiResponse.data,
          averageTxnValue: outflowAverageTxnValueResponse.data,
          topTenTxns: outflowTopTenTxnResponse.data
        }
      }
    });
  }
};
