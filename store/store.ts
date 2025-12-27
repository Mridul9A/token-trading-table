import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';

const isServer = typeof window === "undefined";

export const store = configureStore({
  reducer: tokenReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Often needed for persist
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;