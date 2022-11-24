import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
    setCategories: (state, action) => {
      state.user = {...state.user, categories: action.payload};
    }
  },
});

//export actions
export const { setUser, removeUser, setCategories } = userSlice.actions;
//export reducer
export default userSlice.reducer;
