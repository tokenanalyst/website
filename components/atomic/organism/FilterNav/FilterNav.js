import ReactGA from 'react-ga';
import React from 'react';
import { DATA_WINDOWS, UNITS } from '../../../../constants/filters';

export const FilterNav = ({ dataWindow, setDataWindow, units, setUnits }) => {
  return (
    <div className="container">
      <div className="options">
        {DATA_WINDOWS.map(dw => (
          <span
            key={dw}
            className="option"
            onClick={() => {
              setDataWindow(dw);
              ReactGA.event({
                category: 'User',
                action: `Filter ${dw}`,
                label: `Time Window Filter`,
              });
            }}
          >
            <span
              className={
                dw === dataWindow ? 'option-active' : 'option-inactive'
              }
            >
              {dw.toUpperCase()}
            </span>
          </span>
        ))}
      </div>
      <Separator />
      <div className="options">
        {UNITS.map(unit => (
          <span
            key={unit}
            className="option"
            onClick={() => {
              setUnits(unit);
              ReactGA.event({
                category: 'User',
                action: `Filter ${unit}`,
                label: `Units Filter`,
              });
            }}
          >
            <span
              className={unit === units ? 'option-active' : 'option-inactive'}
            >
              {unit.toUpperCase()}
            </span>
          </span>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            font-family: Open Sans;
            padding: 11px;
            border-bottom: 1px solid rgba(151, 151, 151, 0.15);
            position: fixed;
            width: 100%;
            height: 40px;
            background-color: #ffffff;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            margin-left: -10px;
            margin-top: 1px;
          }
          .options {
            display: flex;
            justify-content: space-evenly;
            padding-top: 0px;
            padding-bottom: 10px;
            width: 100%;
          }
          .option {
            font-weight: bold;
            padding-left: 5px;
            padding-right: 5px;
            cursor: pointer;
          }
          .option-active {
            opacity: 1;
          }
          .option-inactive {
            opacity: 0.2;
          }
          @media only screen and (max-width: 600px) {
            .option {
              cursor: auto;
            }
          }
        `}
      </style>
    </div>
  );
};

const Separator = () => (
  <>
    <div className="separator" />
    <style jsx>
      {`
        .separator {
          border-right: 1px solid rgb(203, 203, 203);
        }
      `}
    </style>
  </>
);
