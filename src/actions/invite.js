import * as api from '../api';
import { SET } from '../constants/actionTypes';

export const getInvitationCode = () => async (dispatch) => {
    try {
        const {data} = await api.getInvitationCode();

        return data;
    } catch (error) {
        return { message: error.response.data.message};
    }
}

export const checkEmail = (email) => async (dispatch) => {
    try {
        const {data} = await api.checkEmail(email);
        return dispatch({ type: SET, data });
    } catch (error) {
        console.log(error.response.data.message);
        return { message: error.response.data.message};
    }
}