import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

// configure the auth reducer (authSlice) to persist its state to browser's local storage
// => when refresh, store data won't be deleted
const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    authReducer: persistedReducer,
  },
  //when using persist, add this to disable check for unserializable store items
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
