import { CRE_NOTI, DEL_NOTI, GET_NOTI } from '../constants/actionTypes';
import * as api from '../api';

export const createNoti = (formData) => async (dispatch) => {
    try {
        const {data} = await api.createNoti(formData);

        return dispatch({type: CRE_NOTI, data});
    } catch (error) {
        return { message: error.response.data.message };
    }
}

export const delNoti = (id) => async (dispatch) => {
    try {   
        await api.deleteNoti(id);
        return dispatch({type: DEL_NOTI, data: id});
    } catch (error) {
        return { message: error.response.data.message };
    }
}

export const getNoti = () => async (dispatch) => {
    try {
        const {data} = await api.getNoti();
        if (data !== undefined) {return dispatch({type: GET_NOTI, data});}
        return dispatch({type:GET_NOTI, data: {}})
    } catch (error) {
        return { message: error.response.data.message };
    }
}