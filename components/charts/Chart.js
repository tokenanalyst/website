import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const CHART_FUNCS = {
  line: "addAreaSeries",
  area: "addHistogramSeries"
};

const Chart = ({ dataSet, width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: height,
      width: width
    });

    dataSet.forEach(data => {
      if (data.visible) {
        const series = chart[CHART_FUNCS[data.series]]({
          title: data.title
        });
        series.setData(data.chartValues);
      }
    });

    return () => chart.remove();
  }, [dataSet]);

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

export default Chart;
