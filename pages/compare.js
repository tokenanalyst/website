import React from "react";
import { useApi } from "../custom-hooks";

import { CompareChartWidget } from "../components/widgets/CompareChartWidget";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";
import { PricingLink } from "../components/PricingLink";

const Compare = () => {
  const compareData = useApi("/api/network-data");

  return (
    <>
      <div className="container">
        <div>
          <PageHeader text={"Compare"} rightElement={<PricingLink />} />
        </div>
        {compareData ? (
          <>
            <CompareChartWidget response={compareData} />
          </>
        ) : (
          <LoadingSpinner />
        )}
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
