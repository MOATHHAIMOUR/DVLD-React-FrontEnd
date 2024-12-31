import { Route, Routes } from "react-router-dom";
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
  const jwt = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute isAuthenticated={jwt !== null}>
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
