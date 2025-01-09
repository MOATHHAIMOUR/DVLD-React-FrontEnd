import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import LookupLocalDrivingLicenseView from "../../../features/Applications/LocalDrivingApplication/Components/LookupLocalDrivingLicenseView";

const LockupLocalDrivingLicensePage = () => {
  return (
    <Box className="p-8 flex flex-col gap-10 h-[100%]">
      <Logo
        title="Local Driving License Information"
        direction="ROW"
        image="/src/assets/images/license.png"
      />
      <Box className="">
        <LookupLocalDrivingLicenseView />
      </Box>
    </Box>
  );
};

export default LockupLocalDrivingLicensePage;
