import Cookies from 'js-cookie';
import axios from 'axios';
import { COOKIES } from '../../constants/cookies';

export const login = async (
  email,
  password,
  loginCtx,
  router,
  setIsSubmitted = () => {},
  setIsError = () => {}
) => {
  try {
    setIsSubmitted(true);
    const response = await axios.post(
      'https://api.tokenanalyst.io/auth/user/login',
      {
        username: email,
        password,
      }
    );
    const {
      data: { apiKey, name, username, id, profile },
    } = response;

    Cookies.set(COOKIES.userId, id);
    Cookies.set(COOKIES.apiKey, apiKey);
    Cookies.set(COOKIES.loggedInAsUsername, username);
    Cookies.set(COOKIES.tier, profile);
    loginCtx.setIsLoggedIn(true);
    loginCtx.intercom.setUser(name, username, id);

    router.push('/');
  } catch (e) {
    setIsError(true);
    setIsSubmitted(false);
  }
};
