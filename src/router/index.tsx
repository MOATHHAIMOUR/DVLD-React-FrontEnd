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

const Router = () => {
  // Access the JWT token from the Redux store
  const jwtToken = useSelector((state: RootState) => state.auth.token);

  console.log("jwtToken: " + jwtToken);
  console.log("jwtToken: " + jwtToken !== null);
  return (
    <Routes>
      <Route
        path="/auth/login"
        element={
          <ProtectedRoute isAllowed={jwtToken === null}>
            <LoginPage />
          </ProtectedRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute isAllowed={jwtToken !== null}>
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
      </Route>
    </Routes>
  );
};

export default Router;
