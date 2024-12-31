import AllTypes from "./ApplicationsRoutes/AllTypes";
import DetainReleaseRoutes from "./ApplicationsRoutes/DetainReleaseRoutes";
import InternationalLicenseRoutes from "./ApplicationsRoutes/InternationalLicenseRoutes";
import localDrivingRoutes from "./ApplicationsRoutes/localLicenseRoutes";
import RenewLicenseRoutes from "./ApplicationsRoutes/RenewLicenseRoutes";
import RenewLicense from "./ApplicationsRoutes/RenewLicenseRoutes";
import ReplaceDamageAndLostLicenseRoutes from "./ApplicationsRoutes/ReplaceDamageAndLostLicenseRoutes";
import SharedApplicationRoutes from "./ApplicationsRoutes/SharedApplicationRoutes";

const applicationRoutes = (
  <>
    {RenewLicense}
    {AllTypes}
    {DetainReleaseRoutes}
    {InternationalLicenseRoutes}
    {SharedApplicationRoutes}
    {localDrivingRoutes}
    {ReplaceDamageAndLostLicenseRoutes}
    {RenewLicenseRoutes}
  </>
);

export default applicationRoutes;
