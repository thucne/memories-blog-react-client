import * as api from '../api';

export const getInvitationCode = () => async (dispatch) => {
    try {
        const {data} = await api.getInvitationCode();

        return data;
    } catch (error) {
        return { message: error.response.data.message};
    }
}