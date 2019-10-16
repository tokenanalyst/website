import { INTERCOM_APP_ID } from '../../../constants/intercom';

const setUser = (name = '', email = '') => {
  if (process.env.NODE_ENV !== 'development') {
    window.Intercom('boot', {
      app_id: INTERCOM_APP_ID,
      name,
      email,
      created_at: new Date().getTime() / 1000,
    });
  }
};

const removeUser = () => {
  if (process.env.NODE_ENV !== 'development') {
    window.Intercom('shutdown');
    window.Intercom('boot', {
      app_id: INTERCOM_APP_ID,
    });
  }
};

export const intercom = {
  removeUser,
  setUser,
};
