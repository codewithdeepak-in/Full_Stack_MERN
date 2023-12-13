import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        global: {}
    },
    reducers: {
        errorGlobal: (state, action) => {
            state.global.error = true; 
            state.global.message = action.payload;
        },
        successGlobal: (state, action) => {
            state.global.success = true;
            state.global.message = action.payload;
        },
        clearNotification: (state) => {
            state.global = {};
        }
    }
})

export const {errorGlobal, successGlobal, clearNotification} = notificationSlice.actions;
export default notificationSlice.reducer;

