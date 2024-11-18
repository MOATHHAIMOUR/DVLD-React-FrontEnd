import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AddNewPersonPage from "../pages/AddNewPersonPage";
import EditPersonPage from "../pages/EditPersonPage";
import PeopleManagementPage from "../pages/PeopleManagementPage";
import PersonDetailsPage from "../pages/PersonDetailsPage";
import FindPersonPage from "../pages/FindPersonPage";
import DeletePersonPage from "../pages/DeletePersonPage";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<PeopleManagementPage />} />
        <Route path="add-person" element={<AddNewPersonPage />} />
        <Route path="edit-person" element={<EditPersonPage />} />
        <Route path="person-details" element={<PersonDetailsPage />} />
        <Route path="find-person" element={<FindPersonPage />} />
        <Route path="delete-person" element={<DeletePersonPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
