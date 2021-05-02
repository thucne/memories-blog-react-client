import { SEE } from '../constants/actionTypes';

const see = (see = {}, action) => {
    switch (action.type) {
        case SEE:
            return {see: action?.data}
        default:
            return see;
    }
}

export default see;
