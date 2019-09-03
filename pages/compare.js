import React from "react";
import { useApi } from "../custom-hooks";
import Link from "next/link";

import { CompareChartWidget } from "../components/widgets/CompareChartWidget";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageHeader } from "../components/PageHeader";

const PricingLink = () => {
  return (
    <>
      <Link href="/pricing">
        <a className="price-link">Get more data</a>
      </Link>
      <style jsx>{`
        a {
          font-family: Space Grotesk;
          font-size: 18px;
          opacity: 0.4;
          text-decoration: none;
        }
        a:visited {
          color: inherit;
          text-decoration: none;
        }
        a:hover {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

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
          font-family: Space Grotesk;
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
