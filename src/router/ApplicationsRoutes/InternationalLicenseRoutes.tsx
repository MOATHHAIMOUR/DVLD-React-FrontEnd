import { Route } from "react-router-dom";
import AddNewInternationalDrivingApplicationPage from "../../pages/Applications/InternationalLicensePages/AddNewInternationalLicensePage";
import LookupInternationalLicensePage from "../../pages/Applications/InternationalLicensePages/LookupInternationalLicensePage";

const InternationalLicenseRoutes = (
  <>
    <Route
      path="international/add-international-license"
      element={<AddNewInternationalDrivingApplicationPage />}
    />
    <Route
      path="international/lookup-international-license"
      element={<LookupInternationalLicensePage />}
    />
  </>
);

export default InternationalLicenseRoutes;
