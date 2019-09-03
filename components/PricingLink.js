import React from "react";
import Link from "next/link";

const renderResponsiveText = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth > 768 ? "Access historical data" : "Historical data";
  }
};

export const PricingLink = () => {
  return (
    <>
      <div>
        <Link href="/pricing">
          <a>
            {renderResponsiveText()}
          </a>
        </Link>
      </div>
      <style jsx>{`
        a {
          color: rgb(250, 78, 150);
          font-weight: 700;
          font-family: Space Grotesk;
          font-size: 18px;
          text-decoration: none;
          border-bottom-style: solid;
          border-bottom-width: 2px;
          border-bottom-color: rgb(250, 78, 150);
        }
        a:visited {
          color: rgb(250, 78, 150);
          font-weight: 700;
          text-decoration: none;
        }
        a:hover {
          color: rgb(250, 78, 150);
          font-weight: 700;
          text-decoration: none;
        }
      `}</style>
    </>
  );
};