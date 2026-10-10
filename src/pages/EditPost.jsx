import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPost({ posts, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((item) => item.id === Number(id));

  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await onUpdate(id, {
        title: title.trim(),
        body: body.trim(),
        userId: post.userId,
      });

      navigate("/");
    } catch {
      setError("Failed to update post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-card">
      <h1>Edit Post</h1>
      <p>Update post #{id}.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="body">Description</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows="6"
          required
        />

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button
            className="button primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>

          <Link to="/" className="button secondary">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default EditPost;