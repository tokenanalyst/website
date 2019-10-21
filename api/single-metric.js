const url = require('url');
const axios = require('axios');
const getUserAuth = require('./auth/getUserAuth');
const makeUnixtimeLimit = require('./utils/makeUnixtimeLimit');
const filterSeriesByTime = require('./utils/filterSeriesByTime');

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

  const result = await axios.get(
    `https://api.tokenanalyst.io/analytics/private/v1/${metric}/last?token=${token}&window=${window}&from_date=${from_date}&to_date=${to_date}&key=${process.env.API_KEY}&format=json`
  );

  res.send(filterSeriesByTime(result.data, tierTimeLimit));
};
