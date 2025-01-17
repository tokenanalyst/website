import axios from 'axios';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import Router from 'next/router';

import { COOKIES } from '../../../../../constants/cookies';
import { API_ERROR_MSG } from '../../../../../constants/apiErrors';

export const onFormRegister = async (loginCtx, formValues) => {
  const API_BASE =
    process.env.NODE_ENV === 'development'
      ? 'https://deb8b069-8fe4-4886-9e86-69ead8b3c28b.mock.pstmn.io'
      : 'https://api.tokenanalyst.io';
  const { email, fullName, password, company } = formValues;

  const result = {
    isSuccess: true,
    errorMsg: null,
    redirectFn: () => {},
  };

  const MIN_STRENGTH_SCORE = 3;

  if (password.strength < MIN_STRENGTH_SCORE) {
    return {
      ...result,
      isSuccess: false,
      errorMsg: 'Please choose a stronger password',
    };
  }

  try {
    await axios.post(`${API_BASE}/auth/user`, {
      username: email,
      password: password.value,
      name: fullName,
      company,
    });

    const response = await axios.post(`${API_BASE}/auth/user/login`, {
      username: email,
      password: password.value,
    });

    const {
      data: { apiKey, name, username, id },
    } = response;

    Cookies.set(COOKIES.userId, id);
    Cookies.set(COOKIES.apiKey, apiKey);
    Cookies.set(COOKIES.loggedInAsUsername, username);
    Cookies.set(COOKIES.tier, 0);

    loginCtx.setIsLoggedIn(true);
    const userMeta = {
      'Registered at': new Date().getTime() / 1000,
    };
    loginCtx.intercom.setUser(name, username, id, userMeta);

    let redirectFn;

    if (loginCtx.postRegisterRedirectUrl) {
      redirectFn = () => {
        ReactGA.event({
          category: 'User',
          action: `Registered via Exchange Page CTA`,
          label: `Funnel`,
        });
        Router.push(
          `/exchange/[token]/[exchange]`,
          `${loginCtx.postRegisterRedirectUrl}?registered=true`
        );
      };
    } else if (loginCtx.postRegisterViaMetricsRedirectUrl) {
      redirectFn = () => {
        ReactGA.event({
          category: 'User',
          action: `Registered via Metrics dialog`,
          label: `Funnel`,
        });
        Router.push(
          `${loginCtx.postRegisterViaMetricsRedirectUrl}?registered=true`
        );
      };
    } else if (loginCtx.postRegisterViaAnalyticsUrl) {
      redirectFn = () => {
        ReactGA.event({
          category: 'User',
          action: `Registered via Analytics`,
          label: `Funnel`,
        });
        Router.push(`${loginCtx.postRegisterViaAnalyticsUrl}?registered=true`);
      };
    } else {
      redirectFn = () => {
        ReactGA.event({
          category: 'User',
          action: `Registered organically`,
          label: `Funnel`,
        });
        Router.push('/?registered=true');
      };
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
