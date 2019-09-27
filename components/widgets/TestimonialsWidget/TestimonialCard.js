import PropTypes from 'prop-types';
import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

export const TestimonialCard = ({ testimonial }) => {
  const { name, company, review, logo } = testimonial;

  return (
    <>
      <Card interactive={false} elevation={Elevation.ZERO}>
        <div className="review">
          <div className="comment">
            <blockquote className="bp3-blockquote">
              <div className={'logo'}>
                <img src={logo} width="50px" />
              </div>
              {review}
            </blockquote>
          </div>
          <div className="reviewer">
            <h3 className={'name'}>{name}</h3>
            <p className={'position'}>
              <span className={'position-company'}>{company}</span>
            </p>
          </div>
        </div>
      </Card>
      <style jsx>{`
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
      `}</style>
    </>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.objectOf(PropTypes.string).isRequired,
};
