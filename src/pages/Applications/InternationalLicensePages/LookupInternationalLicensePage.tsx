import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import LookupInternationalLicense from "../../../features/Applications/InternationalLicenseApplication/Components/LookupInternationalLicenseDetails";

const LookupInternationalLicensePage = () => {
  return (
    <Box className="flex flex-col gap-10 h-[100%]">
      <Logo
        title="Lookup International License"
        direction="ROW"
        image="/src/assets/images/license.png"
      />
      <Box>
        <LookupInternationalLicense />
      </Box>
    </Box>
  );
};

export default LookupInternationalLicensePage;
