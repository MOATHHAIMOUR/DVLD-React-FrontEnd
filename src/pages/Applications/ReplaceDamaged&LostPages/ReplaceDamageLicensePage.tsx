import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import ReplaceDamageLicense from "../../../features/Applications/ReplaceDamage&LostLicenseApplication/Components/ReplaceDamageLicense";

const ReplaceDamageLicensePage = () => {
  return (
    <Box className="mx-auto   p-8 rounded flex flex-col shadow h-[100%]">
      <Logo
        direction="ROW"
        title="Replace Damaged License"
        image="/src/assets/images/broken.png"
      />
      <ReplaceDamageLicense />
    </Box>
  );
};

export default ReplaceDamageLicensePage;
