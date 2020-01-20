const url = require('url');
const getUserAuth = require('./auth/getUserAuth');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const TA = require('../services/ta-api-node/ta');
const formatApiError = require('./utils/formatApiError');
const API_METRICS = require('../constants/apiMetrics').API_METRICS;
const NATIVE_TOKENS = require('../constants/tokens').NATIVE_TOKENS;

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {
    query: { metric, token, window, from_date, to_date },
  } = urlParts;

  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    window,
    userData.tier.timeLimits[window]
  );

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const PARAMS = { window, format: 'json' };

  const params = {
    key: process.env.API_KEY,
    format: PARAMS.format,
    token,
    window: PARAMS.window,
    from_date,
    to_date,
  };

  const apiFunctions = {
    [API_METRICS.Volume]: privateApi.tokenVolumeWindowHistorical,
    [API_METRICS.Transactions]: privateApi.tokenCountWindowHistorical,
    [API_METRICS.Addresses]: privateApi.tokenActiveAddressWindowHistorical,
    [API_METRICS.Supply]: privateApi.tokenSupplyWindowHistorical,
    [API_METRICS.Nvt]: privateApi.tokenNvtWindowHistorical,
    [API_METRICS.Fees]: privateApi.tokenFeesWindowHistorical,
    [API_METRICS.Utxo]: privateApi.tokenUtxoAgeWindowHistorical,
    [API_METRICS.Hashrate]: privateApi.tokenHashrateWindowHistorical,
    [API_METRICS.HashrateBtc]: privateApi.tokenHashrateWindowHistoricalBtc,
    [API_METRICS.Rewards]: privateApi.tokenRewardsWindowHistorical,
    [API_METRICS.Sopr]: privateApi.tokenSoprWindowHistorical,
    [API_METRICS.NewAddress]: privateApi.tokenNewAddressWindowHistorical,
    [API_METRICS.AddressBalances]:
      privateApi.tokenAddressBalancesWindowHistorical,
  };

  let result;

  try {
    result = await apiFunctions[metric](params);
  } catch (err) {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  }

  let response_data;

  if (metric === API_METRICS.Hashrate) {
    response_data = result.data.reduce(
      (acc, curr) =>
        acc.find(data => data.date === curr.date) ? acc : [...acc, curr],
      []
    );
  } else if (metric === API_METRICS.Rewards) {
    response_data = result.data.reduce((acc, curr) => {
      let entry = acc.find(data => data.date === curr.date);
      if (entry) {
        entry.miner_daily_block_reward =
          entry.miner_daily_block_reward + curr.miner_daily_block_reward;
        entry.miner_daily_block_reward_usd =
          entry.miner_daily_block_reward_usd +
          curr.miner_daily_block_reward_usd;
        if (token === NATIVE_TOKENS.ETH) {
          entry.miner_daily_uncle_reward =
            entry.miner_daily_uncle_reward + curr.miner_daily_uncle_reward;
          entry.miner_daily_uncle_reward_usd =
            entry.miner_daily_uncle_reward_usd +
            curr.miner_daily_uncle_reward_usd;
        }
        return acc;
      }
      let new_entry = {
        date: curr.date,
        miner_daily_block_reward: curr.miner_daily_block_reward,
        miner_daily_block_reward_usd: curr.miner_daily_block_reward_usd,
      };
      if (token === NATIVE_TOKENS.ETH) {
        (new_entry.miner_daily_uncle_reward = curr.miner_daily_uncle_reward),
          (new_entry.miner_daily_uncle_reward_usd =
            curr.miner_daily_uncle_reward_usd);
      }
      return [...acc, new_entry];
    }, []);
  } else {
    response_data = result.data;
  }

  res.send(filterSeriesByTime(response_data, tierTimeLimit));
};
