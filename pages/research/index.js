import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { getPosts } from '../../services/blog';

const Blogs = ({ posts }) => {
  return (
    <>
      <Head>
        <title key="title">TokenAnalyst - Research</title>
        <meta
          key="description"
          name="description"
          content="TokenAnalyst insights and and researches on blockchain technology."
        />
      </Head>
      <div className="container">
        <h1 className="header">Research</h1>
        <div className="blogs">
          {posts.map((post, index) => (
            <React.Fragment key={`post-${post.id}`}>
              {index === 0 ? (
                <Link
                  href="/research/[blog]"
                  as={`/research/${post.slug}`}
                  passHref
                >
                  <a>
                    <div className="blog-featured">
                      <div className="image-featured">
                        <img src={post.feature_image} width="100%" />
                      </div>
                      <div className="content-featured">
                        <div className="title-featured" key={post.id}>
                          {post.title}
                        </div>
                        <div>{post.excerpt}</div>
                        <div className="date">
                          {moment(post.published_at).format('LL')}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ) : (
                <div className="blog">
                  <Link
                    href="/research/[blog]"
                    as={`/research/${post.slug}`}
                    passHref
                  >
                    <a>
                      <div className="title" key={post.id}>
                        {post.title}
                      </div>
                      <img src={post.feature_image} className="image" />
                      <div className="content">
                        <div className="excerpt">{post.excerpt}</div>
                        <div className="date">
                          {moment(post.published_at).format('LL')}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
          <style jsx>
            {`
              .blogs {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                background: url(/static/png/pricing/products_list_brg.png);
              }
              .blog-featured {
                display: flex;
                width: 100%;
                border: 1px solid gray;
                border-radius: 10px;
                cursor: pointer;
                background-color: white;
                margin: 20px;
              }
              .blog-featured:hover {
                background-color: #f0f0f0;
              }
              .blog {
                width: 31.1%;
                border: 1px solid gray;
                border-radius: 5px;
                padding: 20px;
                cursor: pointer;
                background-color: white;
                margin: 20px;
              }
              .title {
                font-weight: bold;
                font-size: 24px;
                padding-bottom: 10px;
                max-height: 80px;
                min-height: 80px;
                overflow: hidden;
              }
              .title-featured {
                font-weight: bold;
                font-size: 32px;
                padding-bottom: 10px;
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
              .image-featured {
                width: 50%;
                padding: 10px;
              }
              .content {
                border-top: 1px solid black;
                margin-top: 20px;
              }
              .content-featured {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 20px;
                width: 50%;
                border-left: solid 1px black;
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
                .blog-featured {
                  flex-direction: column;
                }
                .image-featured {
                  width: 100%;
                }
                .content-featured {
                  width: 100%;
                  border-left: 0px;
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
      </div>
    </>
  );
};

Blogs.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Blogs.getInitialProps = async () => {
  const posts = await getPosts();
  return { posts };
};

export default Blogs;
