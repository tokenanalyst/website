/* eslint-disable camelcase */
const url = require('url');
const TA = require('ta-api-node');

const getUserAuth = require('./auth/getUserAuth');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');
const formatApiError = require('./utils/formatApiError');
const { API_METRICS } = require('../constants/apiMetrics');
const { NATIVE_TOKENS } = require('../constants/tokens');

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {
    query: { metric, token, window, from_date, to_date, exchange, miner },
  } = urlParts;
  const { userData } = await getUserAuth(req.cookies.apiKey);

  const tierTimeLimit = makeUnixtimeLimit(
    window,
    userData.tier.timeLimits[window]
  );

  const privateApi = TA({ apiKey: process.env.API_KEY });

  const PARAMS = { window, format: 'json' };

  let params = {
    key: process.env.API_KEY,
    format: PARAMS.format,
    token,
    window: PARAMS.window,
    from_date,
    to_date,
  };

  if (exchange) {
    params = { ...params, exchange: exchange.toLowerCase() };
  }

  if (miner) {
    params = { ...params, miner: miner.toLowerCase() };
  }

  const apiFunctions = {
    [API_METRICS.Volume]: privateApi.tokenVolumeWindowHistorical,
    [API_METRICS.Transactions]: privateApi.tokenCountWindowHistorical,
    [API_METRICS.Addresses]: privateApi.tokenActiveAddressWindowHistorical,
    [API_METRICS.Supply]: privateApi.tokenSupplyWindowHistorical,
    [API_METRICS.Nvt]: privateApi.tokenNvtWindowHistorical,
    [API_METRICS.Fees]: privateApi.tokenFeesWindowHistorical,
    [API_METRICS.Utxo]: privateApi.tokenUtxoAgeWindowHistorical,
    [API_METRICS.Hashrate]: privateApi.tokenMinerHashrateWindowHistorical,
    [API_METRICS.HashrateBtc]: privateApi.tokenHashrateWindowHistorical,
    [API_METRICS.Rewards]: privateApi.tokenMinerRewardsWindowHistorical,
    [API_METRICS.RewardsBtc]: privateApi.tokenRewardsWindowHistorical,
    [API_METRICS.Sopr]: privateApi.tokenSoprWindowHistorical,
    [API_METRICS.NewAddress]: privateApi.tokenNewAddressWindowHistorical,
    [API_METRICS.AddressBalances]:
      privateApi.tokenAddressBalanceGroupWindowHistorical,
    [API_METRICS.ExchangeBalance]: privateApi.exchangeBalanceWindowHistorical,
    [API_METRICS.MinerHashrate]: privateApi.tokenMinerHashrateWindowHistorical,
    [API_METRICS.MinerRewards]: privateApi.tokenMinerRewardsWindowHistorical,
    [API_METRICS.MinerFlow]: privateApi.minerFlowWindowHistorical,
    [API_METRICS.MinerBalances]: privateApi.minerBalanceWindowHistorical,
  };

  let result;

  try {
    result = await apiFunctions[metric](params);
  } catch (err) {
    const { code, body } = formatApiError(err);
    return res.status(code).send(body);
  }

  let responseData;

  if (metric === API_METRICS.Hashrate) {
    responseData = result.data.reduce(
      (acc, curr) =>
        acc.find(data => data.date === curr.date) ? acc : [...acc, curr],
      []
    );
  } else if (metric === API_METRICS.Rewards) {
    responseData = result.data.reduce((acc, curr) => {
      const entry = acc.find(data => data.date === curr.date);
      if (entry) {
        entry.miner_daily_block_reward += curr.miner_daily_block_reward;
        entry.miner_daily_block_reward_usd += curr.miner_daily_block_reward_usd;
        if (token === NATIVE_TOKENS.ETH) {
          entry.miner_daily_uncle_reward += curr.miner_daily_uncle_reward;
          entry.miner_daily_uncle_reward_usd +=
            curr.miner_daily_uncle_reward_usd;
        }
        return acc;
      }
      const newEntry = {
        date: curr.date,
        miner_daily_block_reward: curr.miner_daily_block_reward,
        miner_daily_block_reward_usd: curr.miner_daily_block_reward_usd,
      };
      if (token === NATIVE_TOKENS.ETH) {
        newEntry.miner_daily_uncle_reward = curr.miner_daily_uncle_reward;
        newEntry.miner_daily_uncle_reward_usd =
          curr.miner_daily_uncle_reward_usd;
      }
      return [...acc, newEntry];
    }, []);
  } else {
    responseData = result.data;
  }
  const filteredData = filterSeriesByTime(responseData, tierTimeLimit);

  return res.send(filteredData);
};
