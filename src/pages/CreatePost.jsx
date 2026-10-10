import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreatePost({ onCreate }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await onCreate({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });

      navigate("/");
    } catch {
      setError("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-card">
      <h1>Create Post</h1>
      <p>Add a new post to your list.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter post title"
          required
        />

        <label htmlFor="body">Description</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Enter post description"
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
            {submitting ? "Creating..." : "Create Post"}
          </button>

          <Link to="/" className="button secondary">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;