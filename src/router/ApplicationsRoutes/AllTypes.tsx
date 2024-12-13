import { Route } from "react-router-dom";
import ManageApplicationTypesPage from "../../pages/Applications/shared/ManageApplicationTypesPage";

const AllTypes = (
  <>
    <Route
      path="types/application-types"
      element={<ManageApplicationTypesPage />}
    />
  </>
);

export default AllTypes;
