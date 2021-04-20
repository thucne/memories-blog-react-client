import { AUTH, LOGOUT } from '../constants/actionTypes';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (state = { authData: null }, action) => {
    let user = '';
    let authObject = {};
    switch (action.type) {
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case AUTH:
            if (action?.error) {
                return { ...state, authData: action?.error };
            } else {
                await localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
                user = JSON.parse(localStorage.getItem('profile'));
                authObject = {
                    'username': `${user?.result?.email}chat`,
                    'secret': `${user?.result?.email}chat1`,
                    'first_name': user?.result?.name,
                    'last_name': user?.result?.email
                };
                // console.log(authObject);

                await axios.get(
                    'https://api.chatengine.io/projects/people/',
                    { headers: { "Private-Key": process.env.REACT_APP_SOCKET_SECRET } }
                )
                    .then((response) => {
                        // console.log('HIHI', response.data);
                        let allUsers = response.data;
                        let isUserExit = allUsers.filter((user) => { return user.username === authObject.username });
                        if (isUserExit.length > 0) {

                        } else {
                            axios.post(
                                'https://api.chatengine.io/projects/people/',
                                authObject,
                                { headers: { "Private-Key": process.env.REACT_APP_SOCKET_SECRET } }
                            )
                                .then((response) => {
                                    console.log(response.data);
                                })
                                .catch((error) => console.log(error));
                        }
                    })
                    .catch((error) => console.log(error))

                return { ...state, authData: action?.data };
            }
        default:
            return state;
    }
}

export default auth;
