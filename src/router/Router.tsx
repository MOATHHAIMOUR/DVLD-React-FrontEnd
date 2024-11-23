import { Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import UserManagementPage from "../pages/Users/UserManagementPage";
import AddNewUserPage from "../pages/Users/AddNewUserPage";
import FindUserPage from "../pages/Users/FindUserPage";
import EditUserPage from "../pages/Users/EditUserPage";
import DeleteUserPage from "../pages/Users/DeleteUserPage";
import PeopleManagementPage from "../pages/People/PeopleManagementPage";
import AddNewPersonPage from "../pages/People/AddNewPersonPage";
import PersonDetailsPage from "../pages/People/PersonDetailsPage";
import EditPersonPage from "../pages/People/EditPersonPage";
import FindPersonPage from "../pages/People/FindPersonPage";
import DeletePersonPage from "../pages/People/DeletePersonPage";
import ManageApplicationTypesPage from "../pages/Applications/ManageApplicationTypesPage";

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/*Person Routes  */}
        <Route path="people-management" element={<PeopleManagementPage />} />
        <Route path="add-person" element={<AddNewPersonPage />} />
        <Route path="edit-person" element={<EditPersonPage />} />
        <Route path="person-details" element={<PersonDetailsPage />} />
        <Route path="find-person" element={<FindPersonPage />} />
        <Route path="delete-person" element={<DeletePersonPage />} />
        {/*Users Routes  */}
        <Route path="users-management" element={<UserManagementPage />} />
        <Route path="add-user" element={<AddNewUserPage />} />
        <Route path="find-user" element={<FindUserPage />} />
        <Route path="edit-user" element={<EditUserPage />} />
        <Route path="delete-user" element={<DeleteUserPage />} />

        {/* Application Types */}
        <Route
          path="application-types-management"
          element={<ManageApplicationTypesPage />}
        />
      </Route>
    </Routes>
  );
};
export default Router;
