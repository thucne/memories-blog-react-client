import { SET } from '../constants/actionTypes';

const checkEmail = (exist = false, action) => {
    switch (action.type) {
        case SET:
            return action?.data !== undefined;
        default:
            return exist;
    }
}

export default checkEmail;
