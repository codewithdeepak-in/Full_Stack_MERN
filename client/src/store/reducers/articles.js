import { createSlice } from "@reduxjs/toolkit";


export const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        headSort: {},
        loading: false,
        articles: [],
        current: null
    },
    reducers: {

    }
})


export default articleSlice.reducer;

