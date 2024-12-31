import { Route } from "react-router-dom";
import RenewLocalLicensesApplicationPage from "../../pages/Applications/LocalDrivingApplicationPages/RenewLocalLicensesApplicationPage";

const RenewLicenseRoutes = (
  <>
    <Route
      path="renew/renew-local-licenses"
      element={<RenewLocalLicensesApplicationPage />}
    />
  </>
);

export default RenewLicenseRoutes;
