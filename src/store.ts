// src/app/store.js
import { useDispatch, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { peopleApiSlice } from "./features/People/store/PeopleApiSlice";
import { sharedApiSlice } from "./store/SharedApiSlice";
import { UserApiSlice } from "./features/User/store/UserApiSlice";

import peopleSlice from "./features/People/store/PeopleSlice";
import themeSlice from "./store/ThemeSlice";

import { applicationApiSlice } from "./features/Applications/shared/store/ApplicationApiSlice";
import { LocalDrivingLicenseApplicationApiSlice } from "./features/Applications/LocalDrivingApplication/Store/LocalDrivingLicenseApplicationApiSlice";
import { InternationalLicenseApiSlice } from "./features/Applications/InternationalLicenseApplication/store";
import errorMiddleware from "./middleware/globalErrorMiddleware";
import { TestApiSlice } from "./features/Applications/Tests/Store/TestApiSlice";
import { DetainLicenseApiSlice } from "./features/Applications/DetainReleaseLicenseApplication/Store/DetainLicenseApiSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    peopleSlice: peopleSlice,
    [InternationalLicenseApiSlice.reducerPath]:
      InternationalLicenseApiSlice.reducer,
    [LocalDrivingLicenseApplicationApiSlice.reducerPath]:
      LocalDrivingLicenseApplicationApiSlice.reducer,
    [TestApiSlice.reducerPath]: TestApiSlice.reducer,
    [peopleApiSlice.reducerPath]: peopleApiSlice.reducer,
    [applicationApiSlice.reducerPath]: applicationApiSlice.reducer,
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,
    [sharedApiSlice.reducerPath]: sharedApiSlice.reducer,
    [DetainLicenseApiSlice.reducerPath]: DetainLicenseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      errorMiddleware,
      peopleApiSlice.middleware,
      sharedApiSlice.middleware,
      UserApiSlice.middleware,
      applicationApiSlice.middleware,
      LocalDrivingLicenseApplicationApiSlice.middleware,
      TestApiSlice.middleware,
      InternationalLicenseApiSlice.middleware,
      DetainLicenseApiSlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
