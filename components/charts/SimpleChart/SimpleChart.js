import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import numeral from "numeral";

import { CHART_TYPES } from "../../../constants/chartTypes";

const FORMATTERS = {
  price: value => numeral(value).format("$0,0.00"),
  volume: value => numeral(value).format("0,0.00"),
  truncated: value => numeral(value).format("0.0a")
};

const CHART_FUNCS = {
  line: "addLineSeries",
  area: "addAreaSeries",
  histogram: "addHistogramSeries"
};

export const SimpleChart = ({ dataSet, seriesType, width, height }) => {
  const chartRef = useRef(null);

  const [tooltips, setTooltips] = useState([]);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      height: height,
      width: width,
      localization: {
        priceFormatter: window.matchMedia("(max-width: 768px)").matches
          ? FORMATTERS.truncated
          : FORMATTERS.volume
      },
      priceScale: {
        autoScale: true,
        mode: 1
      }
    });

    const allSeries = dataSet
      .filter(data => data.visible || data.isAlwaysDisplayed)
      .map(data => {
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
        return { series, title: data.title, color: data.solidColor };
      });

    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove(param => {
      setTooltips(
        allSeries.map(series => ({
          title: series.title,
          value: param.seriesPrices.get(series.series),
          color: series.color
        }))
      );
    });

    return () => chart.remove();
  }, [dataSet, seriesType]);

  return (
    <div className="container" ref={chartRef}>
      <div className="tooltip">
        <table>
          {tooltips.map(tooltip =>
            tooltip.value ? (
              <tr>
                <td style={{ color: tooltip.color }}>{tooltip.title}</td>
                <td className="value">
                  {window.matchMedia("(max-width: 768px)").matches
                    ? numeral(tooltip.value).format("0.0a")
                    : numeral(tooltip.value).format("0,0.00")}
                </td>
              </tr>
            ) : (
              <tr />
            )
          )}
        </table>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          position: relative;
        }
        .tooltip {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          font-weight: normal;
          line-height: 20px;
          font-size: 14px;
          padding: 10px;
        }
        .value {
          text-align: right;
          padding-left: 5px;
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
