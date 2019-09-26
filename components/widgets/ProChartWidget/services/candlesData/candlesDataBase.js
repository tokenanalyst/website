const candlesDataBase = {
  fetchCandles: async (pair, timeFrame, start, end, limit) => {
    console.warn(
      `fetchCandles(${pair}, ${timeFrame}, ${start}, ${end}, ${limit})`
    );
  },
};

export default candlesDataBase;
