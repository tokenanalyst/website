import React from "react";

const About = () => {
  return (
    <>
      <div className="container">
        <div className="header">
          TokenAnalyst is on a mission to bring transparency to the
          decentralized economy
        </div>
        <div className="sub-header">
          We enable investors, researchers, developers, and regulators to
          seamlessly access and gain insights from blockchain (on-chain) data
        </div>
        <div className="team">
          <div className="header">Meet the Team</div>
          <div className="members">
            <span>Member</span>
            <span>Member</span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            font-family: Space Grotesk;
            text-align: center;
            padding-top: 20px;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .sub-header {
            font-size: 18px;
          }
          .team {
            padding-top: 20px;
          }
          .members {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
        `}
      </style>
    </>
  );
};

export default About;
