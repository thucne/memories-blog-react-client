import { AUTH, LOGOUT } from '../constants/actionTypes';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const authReducer = async (state = { authData: null }, action) => {
    let user = '';
    let authObject = { };
    switch (action.type) {
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case AUTH:
            await localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            console.log(action?.data);
            console.log(localStorage.getItem('profile'));
            user = JSON.parse(localStorage.getItem('profile'));
            authObject = { 
                'username': `${user?.result?.email}chat`, 
                'secret': `${user?.result?.email}chat1`, 
                'first_name': user?.result?.name,
                'last_name': user?.result?.email
            };
            console.log(authObject);

            await axios.get(
                'https://api.chatengine.io/projects/people/',
                { headers: { "Private-Key": process.env.REACT_APP_SOCKET_SECRET } }
            )
            .then((response) => {
                console.log('HIHI', response.data);
                let allUsers = response.data;
                let isUserExit = allUsers.filter((user) => {return user.username === authObject.username});
                if (isUserExit.length > 0) {

                } else {
                    axios.post(
                        'https://api.chatengine.io/projects/people/',
                        authObject,
                        { headers: { "Private-Key": 'd09e548d-c0e8-4383-b0ff-585ff2c19076' } }
                    )
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error))            

            return { ...state, authData: action?.data };
        default:
            return state;
    }
}

export default authReducer;
