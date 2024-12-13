import AllTypes from "./ApplicationsRoutes/AllTypes";
import DetainReleaseRoutes from "./ApplicationsRoutes/DetainReleaseRoutes";
import InternationalLicenseRoutes from "./ApplicationsRoutes/InternationalLicenseRoutes";
import LicenseRoutes from "./ApplicationsRoutes/LicenseRoutes";
import localDrivingRoutes from "./ApplicationsRoutes/localLicenseRoutes";
import RenewLicense from "./ApplicationsRoutes/RenewLicense";

const applicationRoutes = (
  <>
    {RenewLicense}
    {AllTypes}
    {DetainReleaseRoutes}
    {InternationalLicenseRoutes}
    {LicenseRoutes}
    {localDrivingRoutes}
  </>
);

export default applicationRoutes;
