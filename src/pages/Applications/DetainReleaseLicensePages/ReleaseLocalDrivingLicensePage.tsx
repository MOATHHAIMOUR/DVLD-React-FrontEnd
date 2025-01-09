import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import ReleaseLocalDrivingLicense from "../../../features/Applications/DetainReleaseLicenseApplication/Components/ReleaseLocalDrivingLicense";

const ReleaseLocalDrivingLicensePage = () => {
  return (
    <Box className="p-8 flex flex-col  gap-8">
      <Logo
        direction="ROW"
        title="Release Local Driving License"
        image="/src/assets/images/policeman.png"
      />
      <ReleaseLocalDrivingLicense />
    </Box>
  );
};

export default ReleaseLocalDrivingLicensePage;
