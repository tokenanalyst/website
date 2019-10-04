module.exports = (seconds = 600) => {
  return [['Cache-Control', `s-maxage=${seconds}, stale-while-revalidate`]];
};
