// src/app/store.js
import { useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { peopleApiSlice } from "./features/People/store/PeopleApiSlice";
import { sharedApiSlice } from "./store/SharedApiSlice";
import { UserApiSlice } from "./features/User/store/UserApiSlice";

import peopleSlice from "./features/People/store/PeopleSlice";
import { applicationApiSlice } from "./features/Applications/shared/store/ApplicationApiSlice";

export const store = configureStore({
  reducer: {
    peopleSlice: peopleSlice,
    [peopleApiSlice.reducerPath]: peopleApiSlice.reducer,
    [applicationApiSlice.reducerPath]: applicationApiSlice.reducer,
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,
    [sharedApiSlice.reducerPath]: sharedApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      peopleApiSlice.middleware,
      sharedApiSlice.middleware,
      UserApiSlice.middleware,
      applicationApiSlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
