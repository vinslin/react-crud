import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./api";

import PostsList from "./pages/PostsList";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  async function handleCreate(post) {
    const createdPost = await createPost(post);

    // JSONPlaceholder always returns a simulated ID for new posts.
    // Generate a unique local ID for this browser session.
    setPosts((currentPosts) => [
      {
        ...createdPost,
        id: Date.now(),
        ...post,
      },
      ...currentPosts,
    ]);
  }

  async function handleUpdate(id, updatedPost) {
    const existingPost = posts.find(
      (post) => post.id === Number(id)
    );

    if (!existingPost) {
      throw new Error("Post not found.");
    }

    const result = await updatePost(id, updatedPost);

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === Number(id)
          ? { ...post, ...result, ...updatedPost }
          : post
      )
    );
  }

  async function handleDelete(id) {
    await deletePost(id);

    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== Number(id))
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <Link to="/" className="brand">
          React CRUD
        </Link>

        <Link to="/create" className="button primary">
          + Create Post
        </Link>
      </header>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <p className="message">Loading posts...</p>
              ) : error ? (
                <p className="error">{error}</p>
              ) : (
                <PostsList posts={posts} onDelete={handleDelete} />
              )
            }
          />

          <Route
            path="/create"
            element={<CreatePost onCreate={handleCreate} />}
          />

          <Route
            path="/edit/:id"
            element={
              <EditPost posts={posts} onUpdate={handleUpdate} />
            }
          />

          <Route
            path="/posts/:id"
            element={<PostDetails posts={posts} />}
          />

          <Route
            path="*"
            element={
              <div className="form-card">
                <h2>404 - Page not found</h2>
                <Link to="/" className="button primary">
                  Back to Posts
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;