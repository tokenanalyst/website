const axios = require('axios');
const url = require('url');

const { sanitizeHTML } = require('./utils/sanitizeHTML');
const setResponseCache = require('./utils/setResponseCache');
const { API_ERROR_MSG } = require('../constants/apiErrors');

const API_URL = 'https://us20.api.mailchimp.com/3.0/';
const { MAILCHIMP_USER, MAILCHIMP_API_KEY } = process.env;

const auth = {
  username: MAILCHIMP_USER,
  password: MAILCHIMP_API_KEY,
};

const getCampaignHTML = id =>
  axios(`${API_URL}/campaigns/${id}/content`, {
    auth,
  });

const getCampaignMetaData = id =>
  axios(`${API_URL}/campaigns/${id}`, {
    auth,
  });

module.exports = async (req, res) => {
  const urlParts = url.parse(req.url, true);
  const { id } = urlParts.query;
  if (!id) {
    return res.status(400).send({ message: API_ERROR_MSG.NO_NEWSLETTER_ID });
  }

  let mailchimpResponse;

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
