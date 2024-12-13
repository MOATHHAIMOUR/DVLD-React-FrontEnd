import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import peopleRoutes from "./peopleRoutes";
import userRoutes from "./userRoutes";
import applicationRoutes from "./applicationRoutes";
import testRoutes from "./testRoutes";
import authRoutes from "./auth";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
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
