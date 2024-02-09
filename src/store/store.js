import { configureStore  } from "@reduxjs/toolkit";
import userReducer from './userReducer'
import {
  persistStore,
  persistReducer,

} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = 
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export let persistor = persistStore(store);