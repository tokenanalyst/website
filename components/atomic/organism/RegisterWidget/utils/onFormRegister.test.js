/* global mocksClear */
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import ReactGA from 'react-ga';

import { COOKIES } from '../../../../../constants/cookies';
import { API_ERROR_MSG } from '../../../../../constants/apiErrors';
import { onFormRegister } from './onFormRegister';

jest.mock('axios');
jest.mock('js-cookie');
jest.mock('next/router');
jest.mock('react-ga');

let loginCtx = {
  paymentData: {},
  setPaymentData: jest.fn(),
  setIsLoggedIn: jest.fn(),
  intercom: {
    setUser: jest.fn(),
  },
};

const apiKey = 'abcApiKey';
const name = 'testName';
const username = 'testUserName';
const id = 'testId';
const tier = 0;

const expectCookies = () => {
  expect(Cookies.set).toHaveBeenNthCalledWith(1, COOKIES.apiKey, apiKey);
  expect(Cookies.set).toHaveBeenNthCalledWith(
    2,
    COOKIES.loggedInAsUsername,
    username
  );
  expect(Cookies.set).toHaveBeenNthCalledWith(3, COOKIES.loggedInAsUserId, id);
  expect(Cookies.set).toHaveBeenNthCalledWith(4, COOKIES.tier, tier);
};

axios.post.mockImplementation(async url => {
  if (url === 'https://api.tokenanalyst.io/auth/user') {
    return true;
  }
  if (url === 'https://api.tokenanalyst.io/auth/user/login') {
    return {
      data: {
        apiKey,
        name,
        username,
        id,
      },
    };
  }
  throw Error('API error');
});

describe('onFormRegister function', () => {
  beforeEach(() => {
    mocksClear([
      loginCtx.setPaymentData,
      loginCtx.setIsLoggedIn,
      loginCtx.intercom.setUser,
      Cookies.set,
    ]);
    loginCtx = {
      paymentData: {},
      setPaymentData: jest.fn(),
      setIsLoggedIn: jest.fn(),
      intercom: {
        setUser: jest.fn(),
      },
    };
  });

  it('should check password strength', async () => {
    const formValues = {
      email: 'test@test.com',
      fullName: 'testName',
      password: {
        value: '123',
        verify: '1234',
        strength: 2,
      },
      profession: {
        isTrader: true,
        isEnterprise: true,
        isEnthusiast: true,
        isResearcher: true,
        isDeveloper: true,
        isOther: true,
      },
    };
    const expectedResult = {
      isSuccess: false,
      errorMsg: 'Please choose a stronger password',
      redirectFn: () => null,
    };
    const result = await onFormRegister(loginCtx, formValues);

    expect(result.isSuccess).toEqual(expectedResult.isSuccess);
    expect(result.errorMsg).toEqual(expectedResult.errorMsg);
    expect(result.redirectFn).toBeInstanceOf(Function);
  });

  it('should redirect to stripe', async () => {
    const formValues = {
      email: 'test@test.com',
      fullName: 'testName',
      password: {
        value: '123',
        verify: '123',
      },
      profession: {
        isTrader: true,
        isEnterprise: true,
        isEnthusiast: true,
        isResearcher: true,
        isDeveloper: true,
        isOther: true,
      },
    };

    loginCtx = {
      ...loginCtx,
      paymentData: { stripe: { redirectFn: jest.fn() } },
    };
    const expectedResult = {
      isSuccess: true,
      errorMsg: null,
      redirectFn: () => null,
    };
    const result = await onFormRegister(loginCtx, formValues);

    expect(result.isSuccess).toEqual(expectedResult.isSuccess);
    expect(result.errorMsg).toEqual(expectedResult.errorMsg);
    expect(result.redirectFn).toBeInstanceOf(Function);
    result.redirectFn();
    expect(loginCtx.paymentData.stripe.redirectFn).toHaveBeenCalledWith({
      customerEmail: username,
      clientReferenceId: id.toString(),
    });
    expectCookies();
    expect(loginCtx.setIsLoggedIn).toHaveBeenCalledWith(true);
    expect(loginCtx.intercom.setUser).toHaveBeenCalledWith(name, username);
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'User',
      action: `Registered to make a purchase`,
      label: `Funnel`,
    });
    expect(loginCtx.setPaymentData).toHaveBeenCalledWith({
      ...loginCtx.paymentData,
      stripe: null,
    });
  });

  it('should redirect to /free-tier-success if user registered to access free tier', async () => {
    const formValues = {
      email: 'test@test.com',
      fullName: 'testName',
      password: {
        value: '123',
        verify: '123',
      },
      profession: {
        isTrader: true,
        isEnterprise: true,
        isEnthusiast: true,
        isResearcher: true,
        isDeveloper: true,
        isOther: true,
      },
    };

    loginCtx = {
      ...loginCtx,
      paymentData: { isFreeTier: true },
    };
    const expectedResult = {
      isSuccess: true,
      errorMsg: null,
      redirectFn: () => null,
    };
    const result = await onFormRegister(loginCtx, formValues);

    expect(result.isSuccess).toEqual(expectedResult.isSuccess);
    expect(result.errorMsg).toEqual(expectedResult.errorMsg);
    expect(result.redirectFn).toBeInstanceOf(Function);
    result.redirectFn();
    expect(Router.push).toHaveBeenCalledWith('/free-tier-success');

    expectCookies();
    expect(loginCtx.setIsLoggedIn).toHaveBeenCalledWith(true);
    expect(loginCtx.intercom.setUser).toHaveBeenCalledWith(name, username);
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'User',
      action: `Registered to access free tier`,
      label: `Funnel`,
    });
    expect(loginCtx.setPaymentData).toHaveBeenCalledWith({
      ...loginCtx.paymentData,
      isFreeTier: false,
    });
  });
  it('should redirect to exchange if user registered via Exchange page CTA', async () => {
    const formValues = {
      email: 'test@test.com',
      fullName: 'testName',
      password: {
        value: '123',
        verify: '123',
      },
      profession: {
        isTrader: true,
        isEnterprise: true,
        isEnthusiast: true,
        isResearcher: true,
        isDeveloper: true,
        isOther: true,
      },
    };

    loginCtx = {
      ...loginCtx,
      postRegisterRedirectUrl: '/test-redirect-url',
    };
    const expectedResult = {
      isSuccess: true,
      errorMsg: null,
      redirectFn: () => null,
    };
    const result = await onFormRegister(loginCtx, formValues);

    expect(result.isSuccess).toEqual(expectedResult.isSuccess);
    expect(result.errorMsg).toEqual(expectedResult.errorMsg);
    expect(result.redirectFn).toBeInstanceOf(Function);
    result.redirectFn();
    expect(Router.push).toHaveBeenCalledWith(
      `/exchange/[token]/[exchange]`,
      `${loginCtx.postRegisterRedirectUrl}?registered=true`
    );

    expectCookies();
    expect(loginCtx.setIsLoggedIn).toHaveBeenCalledWith(true);
    expect(loginCtx.intercom.setUser).toHaveBeenCalledWith(name, username);
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'User',
      action: `Registered via Exchange Page CTA`,
      label: `Funnel`,
    });
    expect(loginCtx.setPaymentData).not.toHaveBeenCalled();
  });

  it('should throw error if user exists', async () => {
    const formValues = {
      email: 'test@test.com',
      fullName: 'testName',
      password: {
        value: '123',
        verify: '123',
      },
      profession: {
        isTrader: true,
        isEnterprise: true,
        isEnthusiast: true,
        isResearcher: true,
        isDeveloper: true,
        isOther: true,
      },
    };

    const expectedResult = {
      isSuccess: false,
      errorMsg: 'You are already registered, please login.',
      redirectFn: () => null,
    };

    axios.post.mockImplementationOnce(() => {
      const response = {
        data: {
          message: API_ERROR_MSG.USER_ALREADY_EXISTS,
        },
      };

      const error = new Error();
      error.response = response;
      throw error;
    });

    const result = await onFormRegister(loginCtx, formValues);

    expect(result.isSuccess).toEqual(expectedResult.isSuccess);
    expect(result.errorMsg).toEqual(expectedResult.errorMsg);
    expect(result.redirectFn).toBeInstanceOf(Function);
  });

  it('should throw error if invalid details', async () => {
    const formValues = {
      email: 'test@test.com',
      fullName: 'testName',
      password: {
        value: '123',
        verify: '123',
      },
      profession: {
        isTrader: true,
        isEnterprise: true,
        isEnthusiast: true,
        isResearcher: true,
        isDeveloper: true,
        isOther: true,
      },
    };

    const expectedResult = {
      isSuccess: false,
      errorMsg:
        "Please provide valid details and ensure that you haven't already registered",
      redirectFn: () => null,
    };

    axios.post.mockImplementationOnce(() => {
      const error = new Error();

      throw error;
    });

    const result = await onFormRegister(loginCtx, formValues);

    expect(result.isSuccess).toEqual(expectedResult.isSuccess);
    expect(result.errorMsg).toEqual(expectedResult.errorMsg);
    expect(result.redirectFn).toBeInstanceOf(Function);
  });
});
