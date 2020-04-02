import axios from 'axios';
import md5 from 'md5';

export const sendToPagerDuty = async (
  serviceKey,
  severity,
  source,
  summary
) => {
  const timestamp = new Date().toISOString();
  const dedupKey = md5(`${severity}${source}${summary}`);
  const msgTxt = `[FE] ${source} -> ${summary}`;
  let response;

  try {
    response = await axios.post('https://events.pagerduty.com/v2/enqueue', {
      routing_key: serviceKey,
      event_action: 'trigger',
      dedup_key: dedupKey.substring(0, 254),
      payload: {
        severity,
        source,
        summary: msgTxt.substring(0, 1023),
        timestamp,
      },
    });
  } catch (err) {
    throw new Error(JSON.stringify(err.response.data));
  }
  return response;
};
