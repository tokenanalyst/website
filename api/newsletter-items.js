const axios = require('axios');

const setResponseCache = require('./utils/setResponseCache');

const API_URL = 'https://us20.api.mailchimp.com/3.0/';
const { MAILCHIMP_USER, MAILCHIMP_API_KEY } = process.env;

const auth = {
  username: MAILCHIMP_USER,
  password: MAILCHIMP_API_KEY,
};

const getCampaignsList = () =>
  axios(`${API_URL}/campaigns`, {
    auth,
  });

module.exports = async (req, res) => {
  let mailchimpResponse;

  try {
    mailchimpResponse = await getCampaignsList();
  } catch (err) {
    const {
      response: { data },
    } = err;

    return res.status(data.status).send(data);
  }
  const newsletters = mailchimpResponse.data.campaigns
    .filter(campaign => campaign.send_time)
    .sort((a, b) => new Date(b.send_time) - new Date(a.send_time));

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send(newsletters);
};
