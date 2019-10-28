const axios = require('axios');
const url = require('url');

const { sanitizeHTML } = require('./utils/sanitizeHTML');
const setResponseCache = require('./utils/setResponseCache');

const API_URL = 'https://us20.api.mailchimp.com/3.0/';
const { MAILCHIMP_USER, MAILCHIMP_API_KEY } = process.env;

const auth = {
  username: MAILCHIMP_USER,
  password: MAILCHIMP_API_KEY,
};

const getCampaignHTML = async id =>
  axios(`${API_URL}/campaigns/${id}/content`, {
    auth,
  });

const getCampaignMetaData = async id =>
  axios(`${API_URL}/campaigns/${id}`, {
    auth,
  });

const getCampaignsList = async () =>
  axios(`${API_URL}/campaigns`, {
    auth,
  });

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { id } = urlParts.query;
  let mailchimpResponse;

  if (!id) {
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
  }

  const mailchimpCalls = [getCampaignHTML(id), getCampaignMetaData(id)];

  try {
    mailchimpResponse = await Promise.all(mailchimpCalls);
  } catch (err) {
    const {
      response: { data },
    } = err;

    return res.status(data.status).send(data);
  }
  const [htmlData, metaData] = mailchimpResponse;
  const html = sanitizeHTML(htmlData.data.html);

  setResponseCache().forEach(cacheHeader => {
    res.setHeader(...cacheHeader);
  });

  return res.send({ ...metaData.data, html });
};
