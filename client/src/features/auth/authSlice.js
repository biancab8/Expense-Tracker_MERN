import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth", 
    initialState: {
        isAuthenticated: false, 
        user: {}
    },
    reducers: {
        getUser: (state, action) => {
            state.user = { name: action.payload};
            state.isAuthenticated = true; 
        }
    }
})

//export actions
export const { getUser } = authSlice.actions; 
//export reducer
export default authSlice.reducer;


