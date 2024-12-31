import { Route } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";

const authRoutes = (
  <>
    <Route path="/auth/login" element={<LoginPage />} />
  </>
);

export default authRoutes;
