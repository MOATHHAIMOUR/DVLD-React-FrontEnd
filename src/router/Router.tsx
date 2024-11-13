import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ManagePeople from "../pages/ManagePeople";
import SavePerson from "../pages/SavePerson";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<ManagePeople />} />
        <Route path="add-person" element={<SavePerson />} />
      </Route>
    </Routes>
  );
};

export default Router;
