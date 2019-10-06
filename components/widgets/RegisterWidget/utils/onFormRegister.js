import axios from 'axios';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import Router from 'next/router';

import { COOKIES } from '../../../../constants/cookies';
import { API_ERROR_MSG } from '../../../../constants/apiErrors';

export const onFormRegister = async (loginCtx, formValues) => {
  const {
    email,
    fullName,
    password,
    profession: {
      isTrader,
      isEnterprise,
      isEnthusiast,
      isResearcher,
      isDeveloper,
      isOther,
    },
  } = formValues;

  const result = {
    isSuccess: true,
    errorMsg: null,
    redirectFn: () => null,
  };

  const MIN_STRENGTH_SCORE = 3;

  if (password.strength < MIN_STRENGTH_SCORE) {
    return {
      ...result,
      isSuccess: false,
      errorMsg: 'Please choose a stronger password',
    };
  }

  if (password.value !== password.verify) {
    return { ...result, isSuccess: false, errorMsg: 'Passwords do not match' };
  }

  try {
    await axios.post('https://api.tokenanalyst.io/auth/user', {
      username: email,
      password: password.value,
      name: fullName,
      trader: isTrader,
      enterprise: isEnterprise,
      enthusiast: isEnthusiast,
      researcher: isResearcher,
      developer: isDeveloper,
      other: isOther,
    });

    const response = await axios.post(
      'https://api.tokenanalyst.io/auth/user/login',
      {
        username: email,
        password: password.value,
      }
    );

    const {
      data: { apiKey, name, username, id },
    } = response;

    Cookies.set(COOKIES.apiKey, apiKey);
    Cookies.set(COOKIES.loggedInAs, name);
    Cookies.set(COOKIES.loggedInAsUsername, username);
    Cookies.set(COOKIES.loggedInAsUserId, id);

    loginCtx.setIsLoggedIn(true);
    loginCtx.setLoggedInAs(name);
    loginCtx.intercom.setUser(name, username);

    let redirectFn;

    if (loginCtx.paymentData.stripe && loginCtx.paymentData.stripe.redirectFn) {
      ReactGA.event({
        category: 'User',
        action: `Registered to make a purchase`,
        label: `Funnel`,
      });
      loginCtx.setPaymentData({ ...loginCtx.paymentData, stripe: null });

      redirectFn = () =>
        loginCtx.paymentData.stripe.redirectFn({
          customerEmail: username,
          clientReferenceId: id.toString(),
        });
    } else if (loginCtx.paymentData.isFreeTier) {
      ReactGA.event({
        category: 'User',
        action: `Registered to access free tier`,
        label: `Funnel`,
      });
      loginCtx.setPaymentData({ ...loginCtx.paymentData, isFreeTier: false });
      redirectFn = () => Router.push('/free-tier-success');
    } else if (loginCtx.postRegisterRedirectUrl) {
      ReactGA.event({
        category: 'User',
        action: `Registered via Exchange Page CTA`,
        label: `Funnel`,
      });
      redirectFn = () =>
        Router.push(
          `/exchange/[token]/[exchange]`,
          `${loginCtx.postRegisterRedirectUrl}?registered=true`
        );
    }
    return { ...result, isSuccess: true, redirectFn };
  } catch (e) {
    let errorMsg;

    if (
      e.response &&
      e.response.data &&
      e.response.data.message === API_ERROR_MSG.USER_ALREADY_EXISTS
    ) {
      errorMsg = 'You are already registered, please login.';
    } else {
      errorMsg =
        "Please provide valid details and ensure that you haven't already registered";
    }
    return { ...result, isSuccess: false, errorMsg };
  }
};
