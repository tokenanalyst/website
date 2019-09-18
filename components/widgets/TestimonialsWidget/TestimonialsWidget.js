import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

export const TestimonialsWidget = () => {
  return (
    <>
      <div className={"container"}>
        <div className={"testimonial"}>
          <Card interactive={false} elevation={Elevation.ZERO}>
            <blockquote className="bp3-blockquote">
              <div className={"logo"}>
                <img src="/static/png/logo_mobile.png" width="50px" />
              </div>
              Premium Aerotec is a key supplier for Airbus, producing 30 million
              parts per year, which is huge complexity. Skywise helps us manage
            </blockquote>
            <h3 className={"name"}>Alfred Hitchcock</h3>
            <p className={"position"}>
              <span className={"position-title"}>CEO</span> -{" "}
              <span className={"position-company"}>Company Ltd</span>
            </p>
          </Card>
        </div>
        <div className={"testimonial"}>
          <Card interactive={false} elevation={Elevation.ZERO}>
            <blockquote className="bp3-blockquote">
              <div className={"logo"}>
                <img src="/static/png/logo_mobile.png" width="50px" />
              </div>
              Premium Aerotec is a key supplier for Airbus, producing 30 million
              parts per year, which is huge complexity. Skywise helps us manage
            </blockquote>
            <h3 className={"name"}>Alfred Hitchcock</h3>
            <p className={"position"}>
              <span className={"position-title"}>CEO</span> -{" "}
              <span className={"position-company"}>Company Ltd</span>
            </p>
          </Card>
        </div>
        <div className={"testimonial"}>
          <Card interactive={false} elevation={Elevation.ZERO}>
            <blockquote className="bp3-blockquote">
              <div className={"logo"}>
                <img src="/static/png/logo_mobile.png" width="50px" />
              </div>
              Premium Aerotec is a key supplier for Airbus, producing 30 million
              parts per year, which is huge complexity. Skywise helps us manage
            </blockquote>
            <h3 className={"name"}>Alfred Hitchcock</h3>
            <p className={"position"}>
              <span className={"position-title"}>CEO</span> -{" "}
              <span className={"position-company"}>Company Ltd</span>
            </p>
          </Card>
        </div>
      </div>
      <style jsx>{`
        .container {
          font-family: Open Sans;
          flex-direction: row;
          display: flex;
          justify-content: space-between;
        }
        .testimonial {
          margin: 5px;
          display: flex;
          width: 100%;
          flex-grow: 1;
          font-family: Open Sans;
          flex: 1 1 0px;
        }
        .position {
          margin-bottom: 0px;
        }
        .position-company {
          opacity: 0.8;
        }
        .position-title {
          opacity: 0.8;
          font-weight: 700;
        }
        .name {
          margin-bottom: 0px;
        }
        .logo {
          float: right;
          padding-left: 2px;
          padding-bottom: 2px;
          margin-right: -20px;
        }
        img {
          opacity: 0.8;
          border-radius: 4px;
        }
        @media only screen and (max-width: 768px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
