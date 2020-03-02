import {
  LOGGED_OUT_SUPPORTED_EXCHANGES,
  LOGGED_OUT_SUPPORTED_MINERS,
} from '../constants';

export const isLoginRequiredToAccessEntity = entity => {
  const LOGGED_OUT_SUPPORTED_ENTITIES = [
    ...LOGGED_OUT_SUPPORTED_EXCHANGES,
    ...LOGGED_OUT_SUPPORTED_MINERS,
  ];

  return LOGGED_OUT_SUPPORTED_ENTITIES.indexOf(entity) < 0;
};
