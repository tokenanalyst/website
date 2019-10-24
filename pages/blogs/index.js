import React from 'react';
import { getPosts } from '../../services/blog/client';
import Link from 'next/link';

const Blogs = props => {
  return (
    <div className="container">
      <h1 className="header">Research Blog</h1>
      <div className="blogs">
        {props.posts.map((post, index) => (
          <Link
            href={`/blogs/${post.slug}`}
            as={`/blogs/${post.slug}`}
            passHref
          >
            {index === 0 ? (
              <div className="blog-featured">
                <div>
                  <img src={post.feature_image} width={900} />
                </div>
                <div>
                  <div className="title-featured" key={post.id}>
                    {post.title}
                  </div>
                  <div>{post.excerpt}</div>
                </div>
              </div>
            ) : (
              <div className="blog">
                <div className="title" key={post.id}>
                  {post.title}
                </div>
                <img src={post.feature_image} width={400} />
                <div>{post.excerpt}</div>
              </div>
            )}
          </Link>
        ))}
        <style jsx>{`
          .blogs {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: url(/static/png/pricing/products_list_brg.png);
          }
          .blog-featured {
            display: flex;
            width: 1400px;
            border: 1px solid gray;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;
            background-color: white;
            margin: 20px;
          }
          .blog {
            width: 500px;
            border: 1px solid gray;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;
            background-color: white;
            margin: 20px;
          }
          .title {
            font-weight: bold;
            font-size: 24px;
            padding-bottom: 10px;
          }
          .title-featured {
            font-weight: bold;
            font-size: 32px;
            padding-bottom: 10px;
          }
        `}</style>
      </div>
    </div>
  );
};

Blogs.getInitialProps = async () => {
  const posts = await getPosts();
  return { posts: posts };
};

export default Blogs;
