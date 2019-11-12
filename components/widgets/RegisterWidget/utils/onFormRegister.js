import axios from 'axios';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import Router from 'next/router';

import { COOKIES } from '../../../../constants/cookies';
import { API_ERROR_MSG } from '../../../../constants/apiErrors';

export const onFormRegister = async (loginCtx, formValues) => {
  const API_BASE =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3009'
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

    Cookies.set(COOKIES.apiKey, apiKey);
    Cookies.set(COOKIES.loggedInAsUsername, username);
    Cookies.set(COOKIES.loggedInAsUserId, id);
    Cookies.set(COOKIES.tier, 0);

    loginCtx.setIsLoggedIn(true);
    loginCtx.intercom.setUser(name, username);

    let redirectFn;

    if (loginCtx.paymentData.stripe && loginCtx.paymentData.stripe.redirectFn) {
      loginCtx.setPaymentData({ ...loginCtx.paymentData, stripe: null });

      redirectFn = () => {
        ReactGA.event({
          category: 'User',
          action: `Registered to make a purchase`,
          label: `Funnel`,
        });
        loginCtx.paymentData.stripe.redirectFn({
          customerEmail: username,
          clientReferenceId: id.toString(),
        });
      };
    } else if (loginCtx.paymentData.isFreeTier) {
      loginCtx.setPaymentData({ ...loginCtx.paymentData, isFreeTier: false });
      redirectFn = () => {
        ReactGA.event({
          category: 'User',
          action: `Registered to access free tier`,
          label: `Funnel`,
        });
        Router.push('/free-tier-success');
      };
    } else if (loginCtx.postRegisterRedirectUrl) {
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
