/* eslint-disable camelcase */
const axios = require('axios');
const url = require('url');

const getUserAuth = require('./auth/getUserAuth');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');

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
    page_size,
  } = URL_PARTS.query;

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    interval,
    userData.tier.timeLimits[interval]
  );

  if (end_time < tierTimeLimit) {
    return res.send({
      data: [],
    });
  }

  let apiResult;

  const kaikoCall = `${KAIKO_BASE_URL}/${commodity}.${DATA_VERSION}/exchanges/${exchange}/${instrument_class}/${instrument}/aggregations/ohlcv?interval=${interval}&start_time=${start_time}&end_time=${end_time}&page_size=${page_size}`;

  try {
    apiResult = await axios.get(kaikoCall, {
      headers: {
        'x-api-key': process.env.KAIKO_KEY,
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
      },
    });

    const { data } = apiResult.data;
    const filteredData = filterSeriesByTime(data, tierTimeLimit);

    return res.send({ data: filteredData });
  } catch (e) {
    const resStatus = e.response ? e.response.status : 500;

    return res
      .status(resStatus)
      .send({ error: e.response.statusText, reason: e.response.data.message });
  }
};
