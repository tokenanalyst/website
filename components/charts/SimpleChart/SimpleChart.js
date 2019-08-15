import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CHART_FUNCS = {
  line: "addLineSeries",
  area: "addAreaSeries",
  histogram: "addHistogramSeries"
};

export const SimpleChart = ({ dataSet, seriesType, width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: height,
      width: width
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
