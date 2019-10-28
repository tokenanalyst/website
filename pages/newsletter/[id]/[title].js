/* eslint-disable react/no-danger */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Icon } from '@blueprintjs/core';

const createMarkup = html => {
  return { __html: html };
};

const NewsletterPost = ({ newsletterMetaData, newsletterHTML }) => {
  const {
    settings: { title },
  } = newsletterMetaData;
  return (
    <div className="container">
      <div className="back-link">
        <Link href="/newsletter">
          <a>Newsletter</a>
        </Link>
        <Icon icon="chevron-right" />
        {title}
      </div>
      <div className="title">{title}</div>
      <div dangerouslySetInnerHTML={createMarkup(newsletterHTML)} />
      <Link href="/newsletter">
        <a>Back to Newsletter</a>
      </Link>
      <style jsx>
        {`
          .container {
            margin-left: auto;
            margin-right: auto;
            font-size: 20px;
            width: 600px;
          }
          .title {
            text-align: center;
            padding: 20px;
            margin: 40px;
            font-size: 36px;
            font-weight: bold;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
          }
          .back-link {
            padding-top: 10px;
            display: flex;
            align-items: center;
          }
          @media only screen and (max-width: 768px) {
            .container {
              margin-left: 10px;
              margin-right: 10px;
            }
            .back-link {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

NewsletterPost.propTypes = {
  newsletterMetaData: PropTypes.objectOf(PropTypes.object).isRequired,
  newsletterHTML: PropTypes.string.isRequired,
};

NewsletterPost.getInitialProps = async ctx => {
  const rootUrl =
    process.env.NODE_ENV !== 'development' ? '' : 'http://localhost:3000';
  const { id } = ctx.query;
  const response = await axios.get(`${rootUrl}/api/newsletter-items?id=${id}`);

  const { html, ...rest } = response.data;
  return {
    newsletterMetaData: rest,
    newsletterHTML: html,
  };
};

export default NewsletterPost;
