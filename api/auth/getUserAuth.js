import axios from 'axios';
const { TIERS } = require('../../constants/plans');

module.exports = async token => {
  if (!token) {
    return {
      isAuthorised: false,
      userData: { tier: TIERS['nologin'] },
    };
  }

  try {
    const options = {
      headers: { 'api-key': token },
    };
    const response = await axios.get(
      `https://api.tokenanalyst.io/auth/user/profile`,
      options
    );

    return {
      isAuthorised: true,
      userData: {
        ...response.data,
        tier: TIERS[response.data.profile],
      },
    };
  } catch (e) {
    console.log(e);
    return {
      isAuthorised: false,
      userData: {},
      userData: { tier: TIERS['nologin'] },
    };
  }
};
