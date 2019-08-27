import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import numeral from "numeral";

const FORMATTERS = {
  price: value => numeral(value).format("$0,0.00"),
  volume: value => numeral(value).format("0,0")
};

const CHART_FUNCS = {
  line: "addLineSeries",
  area: "addAreaSeries",
  histogram: "addHistogramSeries"
};

export const SimpleChart = ({
  dataSet,
  seriesType,
  width,
  height,
  formatter = "volume"
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: height,
      width: width,
      localization: {
        priceFormatter: FORMATTERS[formatter]
      }
    });

    dataSet.forEach(data => {
      if (data.visible) {
        const series = chart[CHART_FUNCS[seriesType]]({
          color: data.color,
          title: data.title,
          lineWidth: 4
        });
        series.setData(data.chartValues);
      }
    });

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [dataSet, seriesType]);

  return (
    <div className="container" ref={chartRef}>
      <style jsx>{`
        .container {
        }
        @media only screen and (max-width: 768px) {
          .container {
            padding-bottom: 20px;
            width: 275px;
          }
        }
      `}</style>
    </div>
  );
};
