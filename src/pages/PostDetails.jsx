import { Link, useParams } from "react-router-dom";

function PostDetails({ posts }) {
  const { id } = useParams();

  const post = posts.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <div className="form-card">
        <h2>Post not found</h2>
        <Link to="/" className="button primary">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <article className="form-card">
      <span className="post-id">Post #{post.id}</span>

      <h1>{post.title}</h1>

      <p className="details-body">{post.body}</p>

      <p>
        <strong>User ID:</strong> {post.userId}
      </p>

      <div className="actions">
        <Link
          to={`/edit/${post.id}`}
          className="button warning"
        >
          Edit Post
        </Link>

        <Link to="/" className="button secondary">
          Back to Posts
        </Link>
      </div>
    </article>
  );
}

export default PostDetails;