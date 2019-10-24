import { getSinglePost } from '../../services/blog/client';

const Blog = props => {
  return (
    <div>
      <h1>{props.post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.post.html }} />
      <style jsx>{`
        #__next
          > div
          > div
          > div.jsx-3665592291.page
          > div
          > div
          > p:nth-child(7) {
          color: blue;
        }
        .kg-image {
          width: 200px;
        }
        .kg-card .kg-image-card {
          width: 200px;
        }
        div > figure > img {
          width: 200px;
        }
      `}</style>
    </div>
  );
};

Blog.getInitialProps = async params => {
  const post = await getSinglePost(params.query.blog);
  return { post: post };
};

export default Blog;
