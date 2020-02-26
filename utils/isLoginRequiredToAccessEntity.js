import { LOGGED_OUT_SUPPORTED_EXCHANGES } from '../constants/exchanges';

export const isLoginRequiredToAccessEntity = exchange =>
  LOGGED_OUT_SUPPORTED_EXCHANGES.indexOf(exchange) < 0;
