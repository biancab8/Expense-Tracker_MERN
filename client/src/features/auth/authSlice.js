import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        isAuthenticated: false, 
        user: {},
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true 
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


