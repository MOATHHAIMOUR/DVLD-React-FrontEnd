import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import ReplaceLostLicense from "../../../features/Applications/ReplaceDamage&LostLicenseApplication/Components/ReplaceLostLicense";

const ReplaceLostLicensePage = () => {
  return (
    <Box className="mx-auto  p-8 rounded flex flex-col shadow h-[100%]">
      <Logo
        direction="ROW"
        title="Replace Lost License"
        image="/src/assets/images/question-mark.png"
      />
      <ReplaceLostLicense />
    </Box>
  );
};

export default ReplaceLostLicensePage;
