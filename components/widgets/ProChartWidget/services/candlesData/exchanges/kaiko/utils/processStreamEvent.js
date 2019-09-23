import without from 'lodash/without';

let subscribedPairs = [];

const processStreamEvent = event => {
  const msg = JSON.parse(event.data);
  if (Array.isArray(msg) && subscribedPairs[msg[0]] && msg[1] !== 'hb') {
    const { timeFrame, ticker } = subscribedPairs[msg[0]];
    return [ticker, msg[1], timeFrame];
  }

  if (msg.event === 'subscribed') {
    const keys = msg.key.split(':');
    subscribedPairs[msg.chanId] = `${keys[1]}:${keys[2].substr(1)}`;
    subscribedPairs[msg.chanId] = {
      chanId: msg.chanId,
      timeFrame: keys[1],
      ticker: keys[2].substr(1),
    };
  }

  if (msg.event === 'unsubscribed') {
    subscribedPairs = without(subscribedPairs, msg.chanId);
  }

  return null;
};

export default processStreamEvent;
