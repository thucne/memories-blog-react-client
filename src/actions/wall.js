import { WALL } from '../constants/actionTypes';
import * as api from '../api';

export const getWall = (id) => async (dispatch) => {
    try {
        const { data } = await api.getWall(id);

        return dispatch({type: WALL, data});

    } catch (error) {

        return { message: error.response.data.message };
    }
}
