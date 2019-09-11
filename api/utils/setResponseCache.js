export const setResponseCache = (seconds = 600) => {
  return [
    ["Cache-Control", `s-maxage=${seconds}, stale-while-revalidate`]
  ];
};
