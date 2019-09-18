import { appId as intercomAppId } from "../../../constants/intercom";

const setUser = (name = "", email = "") => {
  window.Intercom("boot", {
    app_id: intercomAppId,
    name,
    email,
    created_at: new Date().getTime() / 1000
  });
};

const removeUser = () => {
  window.Intercom("shutdown");
  window.Intercom("boot", {
    app_id: intercomAppId
  });
};

export const intercom = {
  removeUser,
  setUser
};
