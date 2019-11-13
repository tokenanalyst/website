import Cookies from 'js-cookie';
import { COOKIES } from '../../constants/cookies';
import axios from 'axios';

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
    const response = await axios.post('http://localhost:3009/auth/user/login', {
      username: email,
      password,
    });
    const {
      data: { apiKey, name, username, id, profile },
    } = response;

    Cookies.set(COOKIES.apiKey, apiKey);
    Cookies.set(COOKIES.loggedInAsUsername, username);
    Cookies.set(COOKIES.loggedInAsUserId, id);
    Cookies.set(COOKIES.tier, profile);
    loginCtx.setIsLoggedIn(true);
    loginCtx.intercom.setUser(name, username);

    // This will be redundant soon as we will allow purchase pre-register
    if (loginCtx.paymentData.stripe && loginCtx.paymentData.stripe.redirectFn) {
      loginCtx.setPaymentData({ ...loginCtx.paymentData, stripe: null });
      return loginCtx.paymentData.stripe.redirectFn({
        customerEmail: username,
        clientReferenceId: id.toString(),
      });
    }

    router.push('/');
  } catch (e) {
    setIsError(true);
    setIsSubmitted(false);
  }
};
