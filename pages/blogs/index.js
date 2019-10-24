import React from 'react';
import { getPosts } from '../../services/blog/client';
import Link from 'next/link';

const Blogs = props => {
  return (
    <ul>
      {props.posts.map(post => (
        <>
          <li key={post.id}>{post.title}</li>
          <img src={post.feature_image} width={600} />
          <Link href={`/blogs/${post.slug}`} as={`/blogs/${post.slug}`}>
            Go here
          </Link>
        </>
      ))}
    </ul>
  );
};

Blogs.getInitialProps = async () => {
  const posts = await getPosts();
  return { posts: posts };
};

export default Blogs;
