import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        isAuthenticated: false, 
        user: {categories: []},
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = {...state, ...payload.user};
            // state.user = payload; 
            // state.user = {categories: [{label: "abc"}]}
            // console.log("in slice")
            // console.log(payload.user.categories)
            // console.log("sssssssssssssssssss")
            state.isAuthenticated = true; 
        },
        removeUser: (state) => {
            state.user = {};
            state.isAuthenticated = false; 
        }
    }
})

//export actions
export const { setUser, removeUser } = authSlice.actions; 
//export reducer
export default authSlice.reducer;


