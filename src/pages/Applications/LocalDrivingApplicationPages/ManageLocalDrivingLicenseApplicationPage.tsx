import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import ManageLocalDrivingLicenseApplication from "../../../features/Applications/LocalDrivingApplication/Components/ManageLocalDrivingLicenseApplication";

const ManageLocalDrivingLicenseApplicationPage = () => {
  return (
    <Box className="p-8 flex flex-col gap-6 h-full">
      <Logo
        image="/src/assets/images/license.png"
        direction="COL"
        title="Manage Local Driving Applications"
        imageSize="w-40 h-40"
      />
      <Box className="h-[100%]">
        <ManageLocalDrivingLicenseApplication />
      </Box>
    </Box>
  );
};

export default ManageLocalDrivingLicenseApplicationPage;
