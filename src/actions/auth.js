import { AUTH } from '../constants/actionTypes';
import * as api from '../api';
import axios from 'axios';

export const signin = (formData, history) => async (dispatch) => {
    await axios.get(`https://www.cloudflare.com/cdn-cgi/trace`).then((result) => {
        let data = result.data;
        data = data.replace(/\s+/g,' ').trim();
        let index = data.indexOf('ip=');
        data = data.slice(index, data.length);

        let firstspace = data.indexOf(' ');
        let ip = data.slice(3, firstspace);

        formData.ip = ip;
        formData.when = Date.now();

    }).catch((err) => console.log(err));

    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        return data;
        // history.push('/');
    } catch (error) {
        dispatch({ type: AUTH, error: {message: error.response.data.message} });

        return {message: error.response.data.message};
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        
        dispatch({ type: AUTH, data });
        
        return data;
      
    } catch (error) {
        dispatch({ type: AUTH, error: {message: error.response.data.message} });
        
        return {message: error.response.data.message};
    }
}