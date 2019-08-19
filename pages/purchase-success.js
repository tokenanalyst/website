import React from "react";
import Link from "next/link";

const PurchaseSuccess = () => {
  return (
    <>
      <div className="container">
        <div className="congratulations">Congratulations!</div>
        <div>You have successfully made your purchase.</div>
        <div>
          A confirmation email has been sent to the email address you provided
          on the payment page.
        </div>
        <div>
          You will find your plan details and <strong>API access key</strong>{" "}
          within the email
        </div>
        <div className="issues">Any issues?</div>
        <span>
          Please get in touch with us{" "}
          <a href="mailto:info@tokenanalyst.io">here</a>
        </span>
        <Link href="/" passHref>
          <div className="home-button">Go Home</div>
        </Link>
      </div>
      <style jsx>{`
        .container {
          font-family: Space Grotesk;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        .congratulations {
          font-weight: bold;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .issues {
          padding-top: 20px;
        }
        .home-button {
          color: white;
          min-width: 60px;
          text-align: center;
          background-color: #3fcdab;
          max-height: 20px;
          padding: 10px;
          margin: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default PurchaseSuccess;