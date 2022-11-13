import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from "./features/auth";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

// configure the auth reducer (authSlice) to persist its state to local storage 
// => when refresh, store data won't be deleted
const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
  reducer: {
    authReducer: persistedReducer,
  },
})

export const persistor = persistStore(store);