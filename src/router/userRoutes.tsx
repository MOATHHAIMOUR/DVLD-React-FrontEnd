import { Route } from "react-router-dom";
import UserManagementPage from "../pages/Users/UserManagementPage";
import AddNewUserPage from "../pages/Users/AddNewUserPage";
import FindUserPage from "../pages/Users/FindUserPage";
import EditUserPage from "../pages/Users/EditUserPage";
import DeleteUserPage from "../pages/Users/DeleteUserPage";

const userRoutes = (
  <>
    <Route path="users/users-management" element={<UserManagementPage />} />
    <Route path="users/add-user" element={<AddNewUserPage />} />
    <Route path="users/find-user" element={<FindUserPage />} />
    <Route path="users/edit-user" element={<EditUserPage />} />
    <Route path="users/delete-user" element={<DeleteUserPage />} />
  </>
);

export default userRoutes;
