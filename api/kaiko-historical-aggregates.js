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
  } = URL_PARTS.query;

  const { isAuthorised, userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = userData.tier.timeLimits[interval];

  const seriesTimeLimit = makeUnixtimeLimit(
    interval,
    tierTimeLimit,
    isAuthorised
  );

  if (end_time < seriesTimeLimit) {
    return res.send({
      data: [],
    });
  }

  // console.log(
  //   `${KAIKO_BASE_URL}/${commodity}.${DATA_VERSION}/exchanges/${exchange}/${instrument_class}/${instrument}/aggregations/ohlcv?interval=${interval}&start_time=${start_time}&end_time=${end_time}`
  // );

  let apiResult;

  try {
    apiResult = await axios.get(
      `${KAIKO_BASE_URL}/${commodity}.${DATA_VERSION}/exchanges/${exchange}/${instrument_class}/${instrument}/aggregations/ohlcv?interval=${interval}&start_time=${start_time}&end_time=${end_time}`,
      {
        headers: {
          'x-api-key': process.env.KAIKO_KEY,
          Accept: 'application/json',
          'Accept-Encoding': 'gzip',
        },
      }
    );

    const { data } = apiResult.data;

    res.send({ data: filterSeriesByTime(data, seriesTimeLimit) });
  } catch (e) {
    console.log(e);
    res
      .status(e.response.status)
      .send({ error: e.response.statusText, reason: e.response.data.message });
  }
};
