import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        isAuthenticated: false, 
        user: {categories: [{label: "Miscellaneous"}]},
    },
    reducers: {
        setUser: (state, {payload}) => {
            // state.user = {...state, ...payload.user};
            state.user = {...state, ...payload.user}; 
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


