import React from 'react';
import Link from 'next/link';

import { colors } from '../constants/styles/colors';

export const PricingLink = () => {
  return (
    <>
      <div className="desktop">
        <Link href="/pricing">
          <a>Access historical data</a>
        </Link>
      </div>
      <div className="mobile">
        <Link href="/pricing">
          <a>Historical data</a>
        </Link>
      </div>
      <style jsx>{`
        .mobile {
          display: none;
        }
        a {
          color: rgba(${colors.primaryRed}, 1);
          font-weight: 700;
          font-family: Space Grotesk;
          font-size: 18px;
          text-decoration: none;
          border-bottom-style: solid;
          border-bottom-width: 2px;
          border-bottom-color: rgba(${colors.primaryRed}, 1);
        }
        a:visited {
          color: rgba(${colors.primaryRed}, 1);
          font-weight: 700;
          text-decoration: none;
        }
        a:hover {
          color: rgba(${colors.primaryRed}, 1);
          font-weight: 700;
          text-decoration: none;
        }
        @media only screen and (max-width: 768px) {
          .desktop {
            display: none;
          }
          .mobile {
            display: inline-block;
          }
        }
      `}</style>
    </>
  );
};
