import { GET_INFO, UPDATE_INFO } from '../constants/actionTypes';
import * as api from '../api';

export const getInfo = () => async (dispatch) => {
    try {
        const { data } = await api.getInfo();

        dispatch({ type: GET_INFO, data });

        return data;

    } catch (error) {
        dispatch({ type: GET_INFO, data: {message:  error.response.data.message}});

        return { message: error.response.data.message };
    }
}

export const updateInfo = (formData) => async (dispatch) => {
    try {
        const { data } = await api.updateInfo(formData);

        return dispatch({ type: UPDATE_INFO, data });
    } catch (error) {
        // dispatch({ type: UPDATE_INFO, error: { message: error.response.data.message } });

        return { message: error.response.data.message };
    }
}


export const toggleSubcribe = () => async (dispatch) => {
    try {
        const {data} = await api.toggleSubcribe();

        return dispatch({type: UPDATE_INFO, data});
    } catch (error) {
        return { message: error.response.data.message };
    }
}