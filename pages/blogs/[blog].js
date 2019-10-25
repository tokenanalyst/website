import { getSinglePost } from '../../services/blog/client';

const Blog = props => {
  return (
    <div className="container">
      <div className="title">{props.post.title}</div>
      <div dangerouslySetInnerHTML={{ __html: props.post.html }} />
      <style jsx>{`
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
        @media only screen and (max-width: 768px) {
          .container {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      `}</style>
      <style jsx global>{`
        img {
          max-width: 100%;
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
