import { Link } from "react-router-dom";

function PostsList({ posts, onDelete }) {
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      await onDelete(id);
    } catch {
      window.alert("Failed to delete post.");
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h1>Posts</h1>
          <p>Manage your posts using CRUD operations.</p>
        </div>

        <span className="count">{posts.length} posts</span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts found.</p>
          <Link to="/create" className="button primary">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.id}>
              <span className="post-id">Post #{post.id}</span>

              <h2>{post.title}</h2>

              <p>{post.body}</p>

              <div className="actions">
                <Link
                  to={`/posts/${post.id}`}
                  className="button secondary"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${post.id}`}
                  className="button warning"
                >
                  Edit
                </Link>

                <button
                  type="button"
                  className="button danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default PostsList;