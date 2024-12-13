import { Route } from "react-router-dom";
import ShowLicensesHistoryPage from "../../pages/Applications/shared/ShowLicensesHistoryPage";

const LicenseRoutes = (
  <>
    <Route path="licenses/history" element={<ShowLicensesHistoryPage />} />
  </>
);

export default LicenseRoutes;
