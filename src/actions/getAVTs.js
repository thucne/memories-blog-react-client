import { GET_AVTS } from '../constants/actionTypes';
import * as api from '../api';

export const getAVTs = () => async (dispatch) => {
    try {
        const {data} = await api.getAVTs();

        dispatch({type: GET_AVTS, data});

        return data;
    } catch (error) {
        return { message: error.response.data.message};
    }
}