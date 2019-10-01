import React from 'react';
import classNames from 'classnames';

import { TestimonialCard } from './TestimonialCard';

const TESTIMONIALS = [
  {
    name: 'Yan Liberman',
    company: 'Delphi Digital',
    review: `TokenAnalyst is one of our go-to sources when it comes to
  cryptocurrency data. Their exchange flow data is fundamental
  to parts of our research, and the intuitive API makes data
  integration very straightforward`,
    logo: '/static/jpg/delphi_digital.jpg',
  },
  {
    name: 'Elias Simos',
    company: 'Decentral Park',
    review: `I would say something nice (a few things actually), but if I
  do, you’ll sign up and take my alpha. so there.`,
    logo: '/static/png/decentralpark.png',
  },
  {
    name: 'Anish Patel',
    company: 'Digital Asset Capital',
    review: `I like the work you guys are doing with on-chain analytics.
  It’s an underserved offering, and your team has pulled far
  ahead of others that offer just bits and pieces of on-chain
  analytics. The team’s laser focus for on-chain analytics with
  the depth/ breadth provided and a clear focus on a contextual
  layer is impressive.`,
    logo: '/static/png/digital_asset_capital.png',
  },
];

export const TestimonialsWidget = () => (
  <>
    <div className={'container'}>
      {TESTIMONIALS.map((testimonial, index) => (
        <div
          className={classNames(
            'testimonial',
            `${index === 0 ? '' : 'hidden'}`
          )}
          key={testimonial.name}
        >
          <TestimonialCard testimonial={testimonial} />
        </div>
      ))}
    </div>
    <style jsx>
      {`
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
