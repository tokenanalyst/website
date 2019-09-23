import { INTERCOM_APP_ID } from '../../../constants/intercom';

const setUser = (name = '', email = '') => {
  console.log('intercom loadded boot');
  // window.Intercom('boot', {
  //   app_id: INTERCOM_APP_ID,
  //   name,
  //   email,
  //   created_at: new Date().getTime() / 1000,
  // });
};

const removeUser = () => {
  console.log('intercom loadded remove');
  window.Intercom('shutdown');
  window.Intercom('boot', {
    app_id: INTERCOM_APP_ID,
  });
};

export const intercom = {
  removeUser,
  setUser,
};
