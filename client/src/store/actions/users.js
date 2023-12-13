import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorGlobal, successGlobal } from "../reducers/notifications";
import axios from 'axios';
import { getAuthHeader, removeTokenCookie } from '../../utils/tool';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async ({ email, password }, { dispatch }) => {
        try {
            const obj = {
                email: email,
                password: password
            }
            const request = await axios.post(`/api/auth/register`, obj, {
                withCredentials: true,
            });

            dispatch(successGlobal("Welcome check your email to validate account"))
            return { data: request.data.user, auth: true }

        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)

export const signInUser = createAsyncThunk(
    'users/signInUser',
    async ({ email, password }, { dispatch }) => {
        try {
            const request = await axios.post(`/api/auth/signin`, {
                email: email,
                password: password
            });
            dispatch(successGlobal("Welcome!!"))
            return { data: request.data.user, auth: true }
        } catch (error) {
            dispatch(errorGlobal(error.response.data.message))
            throw error;
        }
    }
)

export const isAuth = createAsyncThunk(
    'users/isauth',
    async() => {
        try{    
            const request = await axios.get('/api/auth/isauth', getAuthHeader());
            return { data: request.data.user, auth: true}
        }catch(error){
            return { data: {}, auth: false}
        }
    }
)

export const signOut = createAsyncThunk(
    'users/signout',
    async() => {
        removeTokenCookie();
    }
)