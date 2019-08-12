import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ title1, data, title2, data2, width = 275, height = 175 }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: height,
      width: width
    });
    const lineSeries = chart.addLineSeries({
      title: title1,
      color: "#0fd491",
      lineWidth: 4,
      crosshairMarkerVisible: true,
      priceFormat: {
        precision: 0
      }
    });
    const lineSeries2 = chart.addLineSeries({
      title: title2,
      color: "#fa4e96",
      priceFormat: {
        precision: 0
      }
    });
    const histogramSeries = chart.addHistogramSeries({
      title: "Volume",
      color: "red"
    });
    const histogramSeries2 = chart.addHistogramSeries({
      color: "#fa4e96"
    });
    lineSeries.setData(data);
    lineSeries2.setData(data2);
    histogramSeries.setData(data);
    // histogramSeries2.setData(data2);
  });

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
