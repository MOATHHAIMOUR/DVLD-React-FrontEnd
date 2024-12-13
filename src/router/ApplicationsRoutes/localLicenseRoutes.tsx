import { Route } from "react-router-dom";
import ManageLocalDrivingLicenseApplicationPage from "../../pages/Applications/LocalDrivingApplicationPages/ManageLocalDrivingLicenseApplicationPage";
import AddNewLocalDrivingApplicationPage from "../../pages/Applications/LocalDrivingApplicationPages/AddNewLocalDrivingApplicationPage";
import LockupLocalDrivingLicensePage from "../../pages/Applications/LocalDrivingApplicationPages/LockupLocalDrivingLicensePage";

const localDrivingRoutes = (
  <>
    <Route
      path="local-driving-license/manage-local-driving-licenses"
      element={<ManageLocalDrivingLicenseApplicationPage />}
    />
    <Route
      path="local-driving/add-local-driving-licenses"
      element={<AddNewLocalDrivingApplicationPage />}
    />
    <Route
      path="local-driving/lookup-local-driving-licenses"
      element={<LockupLocalDrivingLicensePage />}
    />
  </>
);

export default localDrivingRoutes;
