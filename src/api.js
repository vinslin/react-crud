import axios from "axios";


const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
     },
});

export const getPosts = async () => {
    const response = await api.get("/posts");
    return response.data;
};

export const getPostById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
}

export const createPost = async (post) => {
    const response = await api.post("/posts", post);
    return response.data;
}

export const updatePost = async (id, post) => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};