import React from 'react';

const TESTIMONIALS = [
  {
    name: 'Yan Liberman',
    company: 'Delphi Digital',
    review: (
      <p>
        TokenAnalyst is one of our go-to sources when it comes to cryptocurrency
        data. Their exchange flow data is fundamental to parts of our research,
        and the intuitive API makes data integration very straightforward
      </p>
    ),
  },
  {
    name: 'Elias Simos',
    company: 'Decentral Park',
    review: (
      <p>
        I would say something nice (a few things actually), but if I do, you’ll
        sign up and take my alpha. so there.
      </p>
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
      </div>
    ),
  },
];

export const TestimonialsPricing = () => (
  <>
    <div className="container">
      <div className="title">What our customers say</div>
      <div className="reviews">
        {TESTIMONIALS.map((testimonial, index) => {
          const { review, company, name } = testimonial;
          return (
            <div className="review">
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
    </div>
    <style jsx>
      {`
        .container {
          color: #252525;
          display: flex;
          height: 200px;
          flex-direction: column;
        }
        .reviews {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          height: 600px;
          justify-content: space-between;
        }
        .review {
          max-width: 500px;
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
        @media only screen and (max-width: 767px) {
          .container {
            flex-direction: column;
          }
          .hidden {
            display: none;
          }
        }
      `}
    </style>
  </>
);
