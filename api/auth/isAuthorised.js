import axios from 'axios';

module.exports = async token => {
  if (!token) {
    return {
      isAuthorised: false,
      data: {},
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
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      isAuthorised: false,
      data: response.data,
    };
  }
};
