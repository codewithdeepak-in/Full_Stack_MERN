import { createSlice } from "@reduxjs/toolkit";
import { registerUser, signInUser , isAuth, signOut} from "../actions/users";



let DEFAULT_USER_STATE = {
    loading: false,
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        age: null,
        verified: null,
    },
    auth: null,
};

export const userSlice = createSlice({
    name: 'users',
    initialState: DEFAULT_USER_STATE,
    reducers: {
        // Your additional reducers can go here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.auth = action.payload.auth;
            })
            .addCase(registerUser.rejected, (state) => { state.loading = false })

            // Sign in user 
            .addCase(signInUser.pending, (state) => { state.loading = true })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.auth = action.payload.auth;
            })
            .addCase(signInUser.rejected, (state) => { state.loading = false })
            
            // isAuth
            .addCase(isAuth.pending, (state) => { state.loading = true })
            .addCase(isAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {...state.data, ...action.payload.data};
                state.auth = action.payload.auth;
            })
            .addCase(isAuth.rejected, (state) => { state.loading = false })

            // Signout

            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.data = DEFAULT_USER_STATE.data;
                state.auth = false;
            })
    },
});

export default userSlice.reducer;
