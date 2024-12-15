import { Route } from "react-router-dom";
import ShowLicensesHistoryPage from "../../pages/Applications/shared/ShowLicensesHistoryPage";

const SharedApplicationRoutes = (
  <>
    <Route path="licenses/history" element={<ShowLicensesHistoryPage />} />
  </>
);

export default SharedApplicationRoutes;
