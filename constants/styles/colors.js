import { Intent as BPIntent } from '@blueprintjs/core';

export const PRIMARY_RED = 'primaryRed';
export const PRIMARY_GREEN = 'primaryGreen';
export const NEUTRAL_GREY = 'neutralGrey';
export const NEUTRAL_YELLOW = 'neutralYellow';

export const colors = {
  [PRIMARY_RED]: `250, 78, 150`,
  [PRIMARY_GREEN]: `63, 205, 171`,
  [NEUTRAL_GREY]: `15, 212, 145`,
  [NEUTRAL_YELLOW]: `205, 171, 63`,
};

export const colorsHex = {
  [PRIMARY_RED]: `#fa4e0f0`,
  [PRIMARY_GREEN]: `#3fcdab`,
  [NEUTRAL_GREY]: `#E8E8E8`,
  [NEUTRAL_YELLOW]: `#cdab3f`,
};

export const Intent = {
  DANGER: BPIntent.DANGER,
  NONE: BPIntent.NONE,
  PRIMARY: BPIntent.PRIMARY,
  SUCCESS: BPIntent.SUCCESS,
  WARNING: BPIntent.WARNING,
};
