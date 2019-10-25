import { getSinglePost } from '../../services/blog/client';

const Blog = props => {
  return (
    <div className="container">
      <div className="title">{props.post.title}</div>
      <div className="feature-image">
        <img src={props.post.feature_image} width="800" />
      </div>
      {console.log(props.post)}
      <div dangerouslySetInnerHTML={{ __html: props.post.html }} />
      <style jsx>{`
        .container {
          margin-left: 400px;
          margin-right: 400px;
          font-size: 20px;
          object-fit: contain;
        }
        .feature-image {
          text-align: center;
        }
        .title {
          text-align: center;
          padding: 20px;
          margin: 40px;
          font-size: 36px;
          font-weight: bold;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
        }
        .img {
          object-fit: cover;
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
