/* eslint-disable camelcase */
/* eslint-disable react/no-danger */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import moment from 'moment';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';

const Newsletter = ({ newsletterPosts }) => {
  return (
    <div className="container">
      <h1 className="header">Newsletter</h1>
      <div className="blogs">
        {newsletterPosts.map(post => {
          const {
            id,
            send_time,
            settings: { preview_text, subject_line, title },
          } = post;
          return (
            <div className="blog">
              <Link
                href="/newsletter/[id]/[title]"
                as={`/newsletter/${id}/${kebabCase(title)}`}
                passHref
                key={kebabCase(title)}
              >
                <a>
                  <div className="title" key={id}>
                    {title}
                  </div>
                  <div className="content">
                    <div className="excerpt">{subject_line}</div>
                    {preview_text && (
                      <div className="excerpt">{preview_text}</div>
                    )}
                    <div className="date">{moment(send_time).format('LL')}</div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .blogs {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: url('/static/png/pricing/products_list_brg.png');
          }
          .blog {
            width: 31.1%;
            border: 1px solid gray;
            border-radius: 5px;
            padding: 20px;
            cursor: pointer;
            background-color: white;
            margin: 20px;
            min-height: 264px;
          }
          .title {
            font-weight: bold;
            font-size: 24px;
            height: 50px;
          }
          .excerpt {
            padding-top: 20px;
          }
          .image {
            max-height: 300px;
            max-width: 100%;
          }
          .blog:hover {
            background-color: #f0f0f0;
          }
          .content {
            border-top: 1px solid black;
            margin-top: 20px;
          }
          .date {
            padding-top: 10px;
            font-style: italic;
            color: rgba(1, 1, 1, 0.5);
          }
          a {
            text-decoration: none;
            color: black;
          }
          @media only screen and (max-width: 768px) {
            .container {
              margin-left: 10px;
              margin-right: 10px;
            }
            .blog {
              width: 100%;
            }
            .title {
              max-height: 120px;
            }
          }
        `}
      </style>
    </div>
  );
};

Newsletter.propTypes = {
  newsletterPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Newsletter.getInitialProps = async () => {
  const rootUrl =
    process.env.NODE_ENV !== 'development'
      ? 'https://www.tokenanalyst.io'
      : 'http://localhost:3000';
  const response = await axios.get(`${rootUrl}/api/newsletter-items`);
  return {
    newsletterPosts: Object.values(response.data),
  };
};

export default Newsletter;
