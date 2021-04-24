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
//update
export const fetchPosts = () => API.get(`/posts`);
export const createPost = (newPost) => API.post('/posts', newPost); 
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const resetPosts = () => API.get('/posts/resetPosts');

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const getInfo = () => API.get('/user/getInfo');
export const updateInfo = (formData) => API.patch('/user/updateInfo', formData);

export const getAVTs = () => API.get('/user/getAVTs');

export const getComments = () => API.get(`/posts/comments`);
export const postComment = (formData) => API.post('posts/postComment', formData);
export const editComment = (cmtId, formData) => API.patch(`/posts/editComment/${cmtId}`, formData);
export const starComment = (cmtId) => API.patch(`/posts/starComment/${cmtId}`);
export const delComment = (cmtId) => API.delete(`/posts/delComment/${cmtId}`);

export const toggleSubcribe = () => API.post('/user/toggleSubcribe');

export const createNoti = (formData) => API.post('/noti/createNoti', formData);
export const deleteNoti = (id) => API.delete(`/noti/deleteNoti/${id}`);
export const getNoti = () => API.get('/noti');

export const getInvitationCode = () => API.post('/invite');
export const checkEmail = (email) => API.get(`/email/find/${email}`);

export const getWall = (id) => API.get(`/wall/${id}`);