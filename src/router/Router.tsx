import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ManagePeople from "../pages/ManagePeople";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<ManagePeople />} />
      </Route>
    </Routes>
  );
};

export default Router;
