import React from 'react';
import { Icon } from '@blueprintjs/core';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { getSinglePost } from '../../services/blog';

const Blog = ({ post }) => {
  console.log(post);
  const { title, excerpt, html } = post;
  return (
    <>
      <Head>
        <title key="title">{`TokenAnalyst - ${title}`}</title>
        <meta key="description" name="description" content={excerpt} />
      </Head>
      <div className="container">
        <div className="back-link">
          <Link href="/research">
            <a>Research</a>
          </Link>
          <Icon icon="chevron-right" />
          {title}
        </div>
        <div className="title">{title}</div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Link href="/research">
          <a>Back to Research</a>
        </Link>
        <style jsx>
          {`
            .container {
              margin-left: 400px;
              margin-right: 400px;
              font-size: 20px;
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
            :global(.kg-image) {
              max-width: 100%;
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
    </>
  );
};

Blog.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  ).isRequired,
};

Blog.getInitialProps = async params => {
  const post = await getSinglePost(params.query.blog);
  return { post };
};

export default Blog;
