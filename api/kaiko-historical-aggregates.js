import axios from 'axios';
import url from 'url';

const REGION = 'eu';
const KAIKO_BASE_URL = `https://${REGION}.market-api.kaiko.io/v1/data`;
const DATA_VERSION = 'v1';

module.exports = async (req, res) => {
  const URL_PARTS = url.parse(req.url, true);
  const {
    interval,
    start_time,
    end_time,
    commodity,
    exchange,
    instrument_class,
    instrument,
  } = URL_PARTS.query;

  let apiResult;

  try {
    apiResult = await axios.get(
      `${KAIKO_BASE_URL}/${commodity}.${DATA_VERSION}/exchanges/${exchange}/${instrument_class}/${instrument}/aggregations/ohlcv?interval=${interval}&start_time=${start_time}&end_time=${end_time}`
    );
    res.send(apiResult.data);
  } catch (e) {
    res.status(e.response.status).send({ error: e.response.statusText });
  }
};
