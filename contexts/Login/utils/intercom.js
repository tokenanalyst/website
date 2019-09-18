import { INTERCOM_APP_ID } from '../../../constants/intercom';

const setUser = (name = '', email = '') => {
  window.Intercom('boot', {
    app_id: INTERCOM_APP_ID,
    name,
    email,
    created_at: new Date().getTime() / 1000,
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
