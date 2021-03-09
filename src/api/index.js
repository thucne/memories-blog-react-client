import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost, {
    progress: (progressEvent) => {
        
    }
}); 
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);