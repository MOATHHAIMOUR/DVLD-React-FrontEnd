import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import DetainLocalDrivingLicense from "../../../features/Applications/DetainReleaseLicenseApplication/Components/DetainLocalDrivingLicense";

const DetainLocalDrivingLicensePage = () => {
  return (
    <Box className="flex flex-col gap-8">
      <Logo
        direction="ROW"
        title="Detain Local Driving License"
        image="/src/assets/images/policeman.png"
      />
      <DetainLocalDrivingLicense />
    </Box>
  );
};

export default DetainLocalDrivingLicensePage;
