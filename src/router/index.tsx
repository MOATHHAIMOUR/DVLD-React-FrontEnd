import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import peopleRoutes from "./peopleRoutes";
import userRoutes from "./userRoutes";
import applicationRoutes from "./applicationRoutes";
import testRoutes from "./testRoutes";
import authRoutes from "./auth";
import MainPage from "../pages";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
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
