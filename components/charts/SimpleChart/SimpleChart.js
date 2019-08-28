import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import numeral from "numeral";

import { CHART_TYPES } from "../../../constants/chartTypes";

const FORMATTERS = {
  price: value => numeral(value).format("$0,0.00"),
  volume: value => numeral(value).format("0,0.00")
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
      },
      priceScale: {
        autoScale: true,
        mode: 1
      }
    });

    dataSet.forEach(data => {
      if (data.visible || data.isAlwaysDisplayed) {
        const series = chart[
          data.chartType ? CHART_FUNCS[data.chartType] : CHART_FUNCS[seriesType]
        ]({
          color:
            seriesType === CHART_TYPES.histogram
              ? data.topColor
              : data.solidColor,
          topColor: data.topColor,
          bottomColor: data.bottomColor,
          lineColor: data.solidColor,
          title: data.title,
          lineWidth: 2,
          lineStyle: 0,
          crosshairMarkerRadius: 5
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
