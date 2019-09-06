import React from "react";

import { CompareChartWidget } from "../components/widgets/CompareChartWidget";
import { PageHeader } from "../components/PageHeader";
import { PricingLink } from "../components/PricingLink";

const Compare = () => {
  return (
    <>
      <div className="container">
        <PageHeader text={"Transactions"} rightElement={PricingLink} />
        <CompareChartWidget />
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
        }
        .header {
          font-size: 32px;
          font-weight: bold;
          padding: 20px;
          padding-top: 30px;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Compare;
