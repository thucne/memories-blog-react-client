import { EDIT_CMT, GET_CMTS, POST_CMT, DEL_CMT } from '../constants/actionTypes';

const cmts = (cmts = [], action) => {
    switch (action.type) {
        case GET_CMTS:
            return action.data;
        case POST_CMT:
            return [...cmts, action.data];
        case EDIT_CMT:
            return cmts.map((cmt) => cmt._id === action.data._id ? action.data : cmt)
        case DEL_CMT:
            return cmts.filter((cmt) => cmt._id !== action.data)
        default:
            return cmts;
    }
}

export default cmts;
