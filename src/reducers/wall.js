import { WALL } from '../constants/actionTypes';

const wall = (wall = {}, action) => {
    switch (action.type) {
        case WALL:
            return {wall: action?.data}
        default:
            return wall;
    }
}

export default wall;
