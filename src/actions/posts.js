import { FETCH_ALL, CREATE, UPDATE, DELETE, POST_CMT, GET_CMTS, EDIT_CMT, DEL_CMT } from '../constants/actionTypes';
import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();

        return dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        // console.log(error.message);
        return { message: error.response.data.message };
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const completeData = { ...post, createdAt: Date.now() };
        console.log('MSG IS', completeData);
        const { data } = await api.createPost(completeData);

        return dispatch({ type: CREATE, payload: data });

    } catch (error) {
        // console.log(error.message);
        return { message: error.response.data.message };
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        // const completeData = {...post};
        // console.log('MSG IS', completeData);
        const { data } = await api.updatePost(id, post);

        return dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        // console.log(error.message);
        return { message: error.response.data.message };
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        return dispatch({ type: DELETE, payload: id });
    } catch (error) {
        // console.log(error.message);
        return { message: error.response.data.message };
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        return dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        // console.log(error.message);
        return { message: error.response.data.message };
    }
}

export const resetPosts = () => async (dispatch) => {
    try {

        const { data } = await api.resetPosts();

        return dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        return { message: error.response.data.message };

    }
}

export const postComment = (formData) => async (dispatch) => {
    try {

        const { data } = await api.postComment(formData);

        return dispatch({ type: POST_CMT, data });
        
    } catch (error) {

        return { message: error.response.data.message };
    }
}

export const editComment = (cmtId, formData) => async (dispatch) => {
    try {
        const { data } = await api.editComment(cmtId, formData);

        return dispatch({ type: EDIT_CMT, data });
    } catch (error) {
        return { message: error.response.data.message };
    }
}

export const delComment = (cmtId) => async (dispatch) => {
    try {
        await api.delComment(cmtId);

        return dispatch({type: DEL_CMT, data: cmtId});
    } catch (error) {
        return { message: error.response.data.message };
    }
}

export const getComments = () => async (dispatch) => {
    try {

        const { data } = await api.getComments();

        return dispatch({ type: GET_CMTS, data });
    } catch (error) {

        return { message: error.response.data.message };
    }
}

export const starComment = (cmtId) => async (dispatch) => {
    try {
        const {data} = await api.starComment(cmtId);

        return dispatch({type: EDIT_CMT, data});
    } catch (error) {
        return { message: error.response.data.message };
    }
}

