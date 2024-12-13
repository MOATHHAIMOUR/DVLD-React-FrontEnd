import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import RenewLocalDrivingLicense from "../../../features/Applications/RenewLicenseApplication/Components/RenewLocalDrivingLicense";

const RenewLocalLicensesApplicationPage = () => {
  return (
    <Box className="mx-auto bg-white p-8 rounded flex flex-col gap-8 shadow h-[100%]">
      <Logo
        direction="ROW"
        title="Renew Local Driving License Application"
        image="/src/assets/images/renewLicenses.png"
      />
      <RenewLocalDrivingLicense />
    </Box>
  );
};

export default RenewLocalLicensesApplicationPage;
