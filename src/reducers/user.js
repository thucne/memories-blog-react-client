import { GET_INFO, UPDATE_INFO, UPDATE_AVATAR } from '../constants/actionTypes';

const user = (info = {}, action) => {
    switch (action.type) {
        case GET_INFO:
            return {info: action?.data};
        case UPDATE_INFO:
            if (action?.error) {
                console.log('PAW', action.error);
                return {info: action?.error};
            } else {
                // localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
                var temp = JSON.parse(localStorage.getItem('profile'));
                temp.result = {...action?.data};
                
                localStorage.setItem('profile', JSON.stringify(temp));
                return {info: action?.data};
            }
        case UPDATE_AVATAR:
            return {info: action?.data};
        default:
            return info;
    }
}

export default user;
