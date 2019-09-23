import formatter from './formatter';

const makeOptions = opts => {
  const format = formatter[opts.format]
    ? formatter[opts.format]
    : formatter.default;
  return { format };
};

export default makeOptions;
