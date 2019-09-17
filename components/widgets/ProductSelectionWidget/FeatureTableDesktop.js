import React from "react";
import { Icon } from "@blueprintjs/core";

import { FEATURES } from "./data/productsData";
import { colors } from "../../../constants/styles/colors";

export const FeatureTableDesktop = () => {
  return (
    <div className="container">
      <table>
        <tbody>
          {FEATURES.categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <tr className="row-header">
                <td className="column-header">{category.name}</td>
                {FEATURES.columns.map(column => (
                  <td key={column} className="column-header">
                    {index === 0 && column}
                  </td>
                ))}
              </tr>
              {category.items.map(item => (
                <React.Fragment key={item.name}>
                  <tr>
                    <td className="feature">{item.name}</td>
                    {item.entitled.map((e, index) => (
                      <td key={index} className="feature">
                        <Icon
                          icon={e ? "tick" : "cross"}
                          color={
                            e
                              ? `rgba(${colors.primaryGreen})`
                              : `rgba(${colors.primaryRed})`
                          }
                        />
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          font-size: 18px;
          line-height: 24px;
        }
        .row-header {
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
          margin-bottom: 3px;
        }
        .column-header {
          width: 5%;
          font-weight: bold;
          padding-left: 20px;
          padding-right: 10%;
          padding-bottom: 5px;
          padding-top: 10px;
          background-color: rgba(151, 151, 151, 0.15);
        }
        .feature {
          padding-left: 20px;
          padding-right: 90px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
