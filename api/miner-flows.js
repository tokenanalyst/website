/* eslint-disable camelcase */
const url = require('url');
const TA = require('ta-api-node');

const { API_ERROR_MSG } = require('../constants/apiErrors');
const getUserAuth = require('./auth/getUserAuth');
const makeNetFlowSeries = require('./utils/makeNetFlowSeries');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const { makeCallParams } = require('./utils/makeCallParams');
const formatApiError = require('./utils/formatApiError');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { token, miner, timeWindow, from_date, to_date } = urlParts.query;
  const FORMAT = 'json';

  if (!token || !miner || !timeWindow) {
    return res.status(400).send({ message: API_ERROR_MSG.PARAMS_MISSING });
  }

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    timeWindow,
    userData.tier.timeLimits[timeWindow]
  );

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const baseParams = {
    format: FORMAT,
    token,
    miner: encodeURIComponent(miner),
    window: timeWindow,
  };

  const inFlowApiReq = privateApi.minerFlowWindowHistorical(
    makeCallParams(baseParams, 'inflow', from_date, to_date)
  );
  const outFlowApiReq = privateApi.minerFlowWindowHistorical(
    makeCallParams(baseParams, 'outflow', from_date, to_date)
  );

  const [inFlowApiRes, outFlowApiResponse] = await Promise.all([
    inFlowApiReq,
    outFlowApiReq,
  ]).catch(err => {
    const { status, body } = formatApiError(err);
    return res.status(status).send(body);
  });

  let responseErr;

  [inFlowApiRes, outFlowApiResponse].forEach(response => {
    if (response.status !== 200) {
      responseErr = response;
    }
  });

  if (responseErr) {
    const { status, body } = formatApiError(responseErr);

    return res.status(status).send(body);
  }

  const inFlow = inFlowApiRes.data;
  const outFlow = outFlowApiResponse.data;

  const netflow = makeNetFlowSeries(inFlow, outFlow, from_date, to_date);

  return res.send({
    ta_response: {
      inflow: filterSeriesByTime(inFlowApiRes.data, tierTimeLimit),
      outflow: filterSeriesByTime(outFlowApiResponse.data, tierTimeLimit),
      netflow: filterSeriesByTime(netflow, tierTimeLimit),
    },
  });
};
