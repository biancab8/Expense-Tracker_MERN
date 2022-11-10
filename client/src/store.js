import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from "./features/auth";

export default configureStore({
  reducer: {
    authReducer: authSlice,
  },
})