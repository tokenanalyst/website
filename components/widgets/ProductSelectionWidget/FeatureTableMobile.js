import React, { useState } from "react";
import { Icon } from "@blueprintjs/core";

export const FeatureTableMobile = ({ features }) => {
  const [displayedTab, setDisplayedTab] = useState(0);

  return (
    <div className="container">
      <div className="button-container">
        {features.columns.map((column, index) => (
          <span
            className={index === displayedTab ? "button-selected" : "button"}
            onClick={() => setDisplayedTab(index)}
          >
            {column}
          </span>
        ))}
      </div>
      <table>
        {features.categories.map(feature => (
          <>
            <tr className="row-header">{feature.name}</tr>
            {feature.items.map(item => (
              <tr>
                <td className="feature-name">{item.name}</td>
                <td>
                  <Icon
                    icon={item.entitled[displayedTab] ? "tick" : "cross"}
                    color={item.entitled[displayedTab] ? "#3fcdab" : "#fa4e96"}
                  />
                </td>
              </tr>
            ))}
          </>
        ))}
      </table>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          line-height: 24px;
          margin-left: 10px;
          margin-right: 10px;
        }
        .button-container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .button {
          color: black;
          max-height: 20px;
          padding: 10px;
        }
        .button-selected {
          color: black;
          max-height: 20px;
          padding: 10px;
          border-bottom: 2px solid #3fcdab;
          font-weight: bold;
        }
        .row-header {
          font-weight: bold;
          padding-top: 10px;
          padding-bottom: 5px;
          border-bottom: solid 1px rgba(151, 151, 151, 0.15);
        }
        .feature-name {
          padding-right: 50px;
        }
        @media only screen and (min-width: 769px) {
          .container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
