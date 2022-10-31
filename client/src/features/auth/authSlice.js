import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        isAuthenticated: false, 
        user: {}
    },
    reducers: {
        getUser: (state, {payload}) => {
            state.user = payload.user;
            state.isAuthenticated = true; 
        },
        removeUser: (state) => {
            state.user = {};
            state.isAuthenticated = false; 
        }
    }
})

//export actions
export const { getUser, removeUser } = authSlice.actions; 
//export reducer
export default authSlice.reducer;


