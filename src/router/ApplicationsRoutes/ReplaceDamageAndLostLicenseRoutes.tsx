import { Route } from "react-router-dom";
import ReplaceDamageLicensePage from "../../pages/Applications/ReplaceDamaged&LostPages/ReplaceDamageLicensePage";
import ReplaceLostLicensePage from "../../pages/Applications/ReplaceDamaged&LostPages/ReplaceLostLicensePage";

const ReplaceDamageAndLostLicenseRoutes = (
  <>
    <Route
      path="replace/replace-damage-local-license"
      element={<ReplaceDamageLicensePage />}
    />
    <Route
      path="replace/replace-lost-local-license"
      element={<ReplaceLostLicensePage />}
    />
  </>
);

export default ReplaceDamageAndLostLicenseRoutes;
