const Hashids = require('hashids/cjs');

const hashids = new Hashids('ta', 5);

export const VERSION_HASH = hashids.encode('1');

export const APP_STORAGE_KEYS = {
  tokenSnapshot: `ta_token_snapshot_${VERSION_HASH}`,
  minerStats: `ta_miner_studies_${VERSION_HASH}`,
  exchangeFlows: `ta_exchange_studies_${VERSION_HASH}`,
};
