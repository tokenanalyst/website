import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';

export const TestimonialsWidget = () => {
  return (
    <>
      <div className={'container'}>
        <div className={'testimonial'}>
          <Card interactive={false} elevation={Elevation.ZERO}>
            <div className="review">
              <div className="comment">
                <blockquote className="bp3-blockquote">
                  <div className={'logo'}>
                    <img src="/static/jpg/delphi_digital.jpg" width="50px" />
                  </div>
                  "TokenAnalyst is one of our go-to sources when it comes to
                  cryptocurrency data. Their exchange flow data is fundamental
                  to parts of our research, and the intuitive API makes data
                  integration very straightforward"
                </blockquote>
              </div>
              <div className="reviewer">
                <h3 className={'name'}>Yan Liberman</h3>
                <p className={'position'}>
                  <span className={'position-company'}>Delphi Digital</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className={classNames('testimonial', 'hidden')}>
          <Card interactive={false} elevation={Elevation.ZERO}>
            <div className="review">
              <div className="comment">
                <blockquote className="bp3-blockquote">
                  <div className={'logo'}>
                    <img src="/static/png/decentralpark.png" width="50px" />
                  </div>
                  "I would say something nice (a few things actually), but if I
                  do, you’ll sign up and take my alpha. so there."
                </blockquote>
              </div>
              <div className="reviewer">
                <h3 className={'name'}>Elias Simos</h3>
                <p className={'position'}>
                  <span className={'position-company'}>Decentral Park</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className={classNames('testimonial', 'hidden')}>
          <Card interactive={false} elevation={Elevation.ZERO}>
            <div className="review">
              <div className="comment">
                <blockquote className="bp3-blockquote">
                  <div className={'logo'}>
                    <img
                      src="/static/png/digital_asset_capital.png"
                      width="50px"
                    />
                  </div>
                  "I like the work you guys are doing with on-chain analytics.
                  It’s an underserved offering, and your team has pulled far
                  ahead of others that offer just bits and pieces of on-chain
                  analytics. The team’s laser focus for on-chain analytics with
                  the depth/ breadth provided and a clear focus on a contextual
                  layer is impressive."
                </blockquote>
              </div>
              <div className="reviewer">
                <h3 className={'name'}>Anish Patel</h3>
                <p className={'position'}>
                  <span className={'position-company'}>
                    Digital Asset Capital
                  </span>
                </p>
              </div>
            </div>
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
          align-content: space-between;
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
          padding-left: 10px;
          padding-bottom: 2px;
          margin-right: -20px;
        }
        .comment {
          flex-grow: 1;
        }
        .review {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        img {
          opacity: 0.8;
          border-radius: 4px;
        }
        @media only screen and (max-width: 767px) {
          .hidden {
            display: none;
          }
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};
