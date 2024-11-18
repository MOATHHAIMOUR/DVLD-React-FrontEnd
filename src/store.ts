// src/app/store.js
import { useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { peopleApiSlice } from "./features/People/store/PeopleApiSlice";
import { sharedApiSlice } from "./store/SharedApiSlice";

export const store = configureStore({
  reducer: {
    [peopleApiSlice.reducerPath]: peopleApiSlice.reducer,
    [sharedApiSlice.reducerPath]: sharedApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(peopleApiSlice.middleware, sharedApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
