import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Link from 'next/link';
import classNames from 'classnames';
import css from 'styled-jsx/css';

import { pricingButton } from '../constants/styles/common-styled-jsx';

const reviewsStyle = css`
  p {
    font-family: Cardo;
    font-size: 23px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    line-height: 1.61;
    letter-spacing: 0.73px;
    color: #000000;
    padding-bottom: 50px;
  }
  @media only screen and (max-width: 767px) {
    p {
      font-size: 20px;
      line-height: 1.3;
      padding-bottom: 10px;
    }
  }
`;

const TESTIMONIALS = [
  {
    name: 'Yan Liberman',
    company: 'Delphi Digital',
    review: (
      <>
        <p>
          TokenAnalyst is one of our go-to sources when it comes to
          cryptocurrency data. Their exchange flow data is fundamental to parts
          of our research, and the intuitive API makes data integration very
          straightforward
        </p>
        <style jsx>{reviewsStyle}</style>
      </>
    ),
  },
  {
    name: 'Elias Simos',
    company: 'Decentral Park',
    review: (
      <>
        <p>
          I would say something nice (a few things actually), but if I do,
          you’ll sign up and take my alpha. so there.
        </p>
        <style jsx>{reviewsStyle}</style>
      </>
    ),
  },
  {
    name: 'Anish Patel',
    company: 'Digital Asset Capital',
    review: (
      <div>
        <p>
          I like the work you guys are doing with on-chain analytics. It’s an
          underserved offering, and your team has pulled far ahead of others
          that offer just bits and pieces of on-chain analytics.
        </p>
        <p>
          The team’s laser focus for on-chain analytics with the depth/ breadth
          provided and a clear focus on a contextual layer is impressive.
        </p>
        <style jsx>{reviewsStyle}</style>
      </div>
    ),
  },
];

const renderLinks = () => {
  return (
    <div className="container">
      <Link href="/#">
        <a className="link">Platform</a>
      </Link>
      <Link href="/#">
        <a className="link">API and WebSocket</a>
      </Link>
      <Link href="/#">
        <a className="link">Enterprise</a>
      </Link>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            position: absolute;
            bottom: 40px;
            right: 20px;
          }
          .link {
            background-image: url('/static/svg/pricing/arrow.svg');
            background-repeat: no-repeat;
            background-position: left;
            font-family: Open Sans;
            font-size: 15px;
            font-weight: 700;
            font-style: normal;
            font-stretch: normal;
            margin-bottom: 16px;
          }
          a {
            padding-left: 25px;
            color: #252525;
          }
          a:hover {
            color: #252525;
          }
          a:active {
            color: #252525;
          }
          a:visited {
            color: #252525;
          }
          @media only screen and (max-width: 767px) {
            .container {
              display: flex;
              flex-direction: row;
              position: relative;
            }
          }
        `}
      </style>
    </div>
  );
};

export const TestimonialsPricing = () => (
  <>
    <div className="container">
      <div className="title">What our customers say</div>
      <div className="reviews">
        {TESTIMONIALS.map((testimonial, index) => {
          const { review, company, name } = testimonial;
          return (
            <div className="review" key={kebabCase(name)}>
              <div className="comment">{review}</div>
              <div className="name-container">
                <div className="name">
                  <div>{name}</div>
                  <div>{company}</div>
                </div>
              </div>
              {index === 0 && <div className="separator" />}
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <a
          className={classNames('buttonLink', 'buttonActive')}
          href="mailto:info@tokenanalyst.io"
        >
          Request a demo
        </a>
      </div>
      <div className="links-container">{renderLinks()}</div>
    </div>
    <style jsx>{pricingButton}</style>
    <style jsx>
      {`
        .container {
          color: #252525;
          display: flex;
          flex-direction: column;
          background-image: url('/static/svg/pricing/testimonial_background.svg');
          background-repeat: no-repeat;
          background-position: right 40px top 170px;
          padding-top: 100px;
          background-size: 450px;
          padding-bottom: 90px;
          position: relative;
        }
        .reviews {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          max-height: 700px;
        }
        .review {
          max-width: 550px;
        }
        .title {
          font-family: Space Grotesk;
          font-size: 30px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: 0.26px;
          color: #000000;
          margin-bottom: 50px;
        }
        .comment {
          font-family: Cardo;
          font-size: 23px;
          font-weight: normal;
          font-style: italic;
          font-stretch: normal;
          line-height: 1.61;
          letter-spacing: 0.86px;
          color: #000000;
        }
        .name {
          padding-left: 35px;
          background-image: url('/static/svg/pricing/testimonial_name.svg');
          background-repeat: no-repeat;
          background-position: left;
        }
        .name-container {
          font-family: Cardo;
          font-size: 16px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: 0.14px;
          color: #000000;
          display: flex;
          justify-content: flex-end;
        }
        .separator {
          height: 20px;
          length: 300px;
          background-image: url('/static/svg/pricing/testimonial_separator.svg');
          background-repeat: no-repeat;
          background-position: left;
          margin-top: 40px;
          margin-bottom: 40px;
        }
        .button-container {
          padding-top: 27px;
        }
        .links-container {
          position: absolute;
          width: 500px;
          height: 300px;
          right: 150px;
          bottom: 50px;
          background-image: url('/static/svg/pricing/testimonial_background_links.svg');
          background-repeat: no-repeat;
          background-position: left;
        }
        .link {
          background-image: url('/static/svg/pricing/arrow.svg');
          background-repeat: no-repeat;
          background-position: left;
          font-family: Open Sans;
          font-size: 15px;
          font-weight: 700;
          font-style: normal;
          font-stretch: normal;
          margin-bottom: 16px;
        }
        a {
          color: #ffffff;
          text-decoration: none;
        }
        a:hover {
          color: #ffffff;
        }
        a:active {
          color: #ffffff;
        }
        a:visited {
          color: #ffffff;
        }

        @media only screen and (max-width: 767px) {
          .container {
            flex-direction: column;
            background-image: none;
            padding-top: 20px;
          }
          .title {
            font-family: Space Grotesk;
            font-size: 30px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.26px;
            color: #000000;
            margin-bottom: 20px;
          }
          .reviews {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            max-height: 100%;
            font-size: 20px;
          }
          .links-container {
            display: none;
          }
          .name-container {
            font-family: Cardo;
            font-size: 16px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: 0.14px;
            color: #000000;
            display: flex;
            justify-content: flex-start;
            padding-bottom: 20px;
          }
          .separator {
            display: none;
          }
        }
      `}
    </style>
  </>
);
