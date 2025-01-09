import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Update the path based on your store setup
import RootLayout from "../layouts/RootLayout";
import peopleRoutes from "./peopleRoutes";
import userRoutes from "./userRoutes";
import applicationRoutes from "./applicationRoutes";
import testRoutes from "./testRoutes";
import authRoutes from "./auth";
import MainPage from "../pages";
import LoginPage from "../pages/Auth/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AccountSettingsPage from "../pages/settings/AccountSettingsPage";

const Router = () => {
  // Access the JWT token from the Redux store
  const jwtToken = useSelector((state: RootState) => state.auth.token);
  const isloading = useSelector((state: RootState) => state.auth.isLoading);

  if (isloading) {
    // Optional: Render a loading spinner or fallback UI
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />;
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/auth/login"
        element={
          <ProtectedRoute isAllowed={jwtToken === null} redirectPath="/">
            <LoginPage />
          </ProtectedRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute
            isAllowed={jwtToken !== null}
            redirectPath="/auth/login"
          >
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MainPage />} />
        {peopleRoutes}
        {userRoutes}
        {applicationRoutes}
        {testRoutes}
        {authRoutes}
        <Route path="Account/settings" element={<AccountSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
