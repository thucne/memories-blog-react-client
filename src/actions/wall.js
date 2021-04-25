import { WALL, GET_INFO } from '../constants/actionTypes';
import * as api from '../api';

export const getWall = (id) => async (dispatch) => {
    try {
        const { data } = await api.getWall(id);

        return dispatch({type: WALL, data});

    } catch (error) {

        return { message: error.response.data.message };
    }
}

export const toggleFollow = (id) => async (dispatch) => {
    try {
        const {data} = await api.toggleFollow(id);
        return dispatch({type: GET_INFO, data});
        
    } catch (error) {
        return { message: error.response.data.message };

    }
}
