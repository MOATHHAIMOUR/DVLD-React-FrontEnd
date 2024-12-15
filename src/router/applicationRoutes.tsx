import AllTypes from "./ApplicationsRoutes/AllTypes";
import DetainReleaseRoutes from "./ApplicationsRoutes/DetainReleaseRoutes";
import InternationalLicenseRoutes from "./ApplicationsRoutes/InternationalLicenseRoutes";
import localDrivingRoutes from "./ApplicationsRoutes/localLicenseRoutes";
import RenewLicense from "./ApplicationsRoutes/RenewLicense";
import SharedApplicationRoutes from "./ApplicationsRoutes/SharedApplicationRoutes";

const applicationRoutes = (
  <>
    {RenewLicense}
    {AllTypes}
    {DetainReleaseRoutes}
    {InternationalLicenseRoutes}
    {SharedApplicationRoutes}
    {localDrivingRoutes}
  </>
);

export default applicationRoutes;
