import { Route } from "react-router-dom";
import ReleaseLocalDrivingLicensePage from "../../pages/Applications/DetainReleaseLicensePages/ReleaseLocalDrivingLicensePage";
import DetainLocalDrivingLicensePage from "../../pages/Applications/DetainReleaseLicensePages/DetainLocalDrivingLicensePage copy";

const DetainReleaseRoutes = (
  <>
    <Route
      path="detain-release/release-licenses"
      element={<ReleaseLocalDrivingLicensePage />}
    />
    <Route
      path="detain-release/detain-licenses"
      element={<DetainLocalDrivingLicensePage />}
    />
  </>
);

export default DetainReleaseRoutes;
