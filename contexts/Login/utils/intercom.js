/* eslint-disable camelcase */
import { INTERCOM_APP_ID } from '../../../constants/intercom';

const setUser = (name = '', email = '', user_id, meta = {}) => {
  window.Intercom('boot', {
    app_id: INTERCOM_APP_ID,
    name,
    email,
    user_id,
    ...meta,
  });
};

const removeUser = () => {
  window.Intercom('shutdown');
  window.Intercom('boot', {
    app_id: INTERCOM_APP_ID,
  });
};

export const intercom = {
  removeUser,
  setUser,
};
