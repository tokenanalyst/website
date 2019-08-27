import axios from "axios";

module.exports = async token => {
  try {
    // This is a completely arbitrary HTTP call to a protected endpoint to determine if the user's API key is legit.
    await axios.get(
      `https://api.tokenanalyst.io/analytics/private/v1/exchange_flow_historical/last?key=${token}&format=json&token=BTC&direction=inflow&exchange=Binance`
    );
    return true;
  } catch (e) {
    return e.response.status !== 401;
  }
};
