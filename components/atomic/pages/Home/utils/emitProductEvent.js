import ReactGA from 'react-ga';

export const emitProductEvent = (name, tracking) => {
  ReactGA.event({
    category: 'User',
    action: `Home Button ${name}`,
    label: `New Home`,
  });
  //window.Intercom('trackEvent', tracking);
};
