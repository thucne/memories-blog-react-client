import { GET_AVTS } from '../constants/actionTypes';

const getAVTs = (avts = [], action) => {
    switch (action.type) {
        case GET_AVTS:
            return action?.data;
        default:
            return avts;
    }
}

export default getAVTs;
