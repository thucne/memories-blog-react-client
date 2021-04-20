import { CRE_NOTI, DEL_NOTI, GET_NOTI } from '../constants/actionTypes';

const noti = (state = { noti: [] }, action) => {
    switch (action.type) {
        case GET_NOTI:
            return {...state, noti: action?.data}
        case CRE_NOTI:
            return { ...state, noti: [...state.noti, action?.data] }
        case DEL_NOTI:
            return { ...state, noti: [...state.noti.filter((noti) => noti._id !== action?.data)] }
        default:
            return state;
    }
}

export default noti;
