import { Route } from "react-router-dom";
import PeopleManagementPage from "../pages/People/PeopleManagementPage";
import AddNewPersonPage from "../pages/People/AddNewPersonPage";
import EditPersonPage from "../pages/People/EditPersonPage";
import PersonDetailsPage from "../pages/People/PersonDetailsPage";
import FindPersonPage from "../pages/People/FindPersonPage";
import DeletePersonPage from "../pages/People/DeletePersonPage";

const peopleRoutes = (
  <>
    <Route path="people/people-management" element={<PeopleManagementPage />} />
    <Route path="people/add-person" element={<AddNewPersonPage />} />
    <Route path="people/edit-person" element={<EditPersonPage />} />
    <Route path="people/person-details" element={<PersonDetailsPage />} />
    <Route path="people/find-person" element={<FindPersonPage />} />
    <Route path="people/delete-person" element={<DeletePersonPage />} />
  </>
);

export default peopleRoutes;
