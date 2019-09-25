const axios = require('axios');
const url = require('url');
const moment = require('moment');

const isAuthorised = require('./auth/isAuthorised');

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
  const isUnlimited =
    req.cookies.apiKey && (await isAuthorised(req.cookies.apiKey));

  let apiResult;

  const limitDataForFreeUsers = result => {
    if (isUnlimited) {
      return result;
    }

    const ninetyDaysAgo = moment()
      .subtract(90, 'days')
      .valueOf();

    const filterSerie = serie =>
      serie.filter(item => {
        return item.timestamp > ninetyDaysAgo;
      });

    const { data } = result;

    return {
      ...result,
      data: filterSerie(data),
    };
  };

  if (!isUnlimited) {
    const threeDaysAgo = moment()
      .subtract(90, 'days')
      .valueOf();

    if (end_time < threeDaysAgo) {
      return res.send({
        data: [],
      });
    }
  }

  // console.log(
  //   `${KAIKO_BASE_URL}/${commodity}.${DATA_VERSION}/exchanges/${exchange}/${instrument_class}/${instrument}/aggregations/ohlcv?interval=${interval}&start_time=${start_time}&end_time=${end_time}`
  // );

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
    res.send(limitDataForFreeUsers(apiResult.data));
  } catch (e) {
    res
      .status(e.response.status)
      .send({ error: e.response.statusText, reason: e.response.data.message });
  }
};
