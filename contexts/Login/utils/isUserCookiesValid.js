import Cookies from 'js-cookie';

import { COOKIES } from '../../../constants/cookies';

export const isUserCookiesValid = () => {
  return !!(
    Cookies.get(COOKIES.apiKey) &&
    Cookies.get(COOKIES.loggedInAsUsername) &&
    Cookies.get(COOKIES.loggedInAsUserId)
  );
};
