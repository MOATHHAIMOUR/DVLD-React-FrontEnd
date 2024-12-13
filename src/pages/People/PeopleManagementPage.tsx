import Box from "../../components/ui/Box";
import Logo from "../../components/ui/Logo";
import ManagePeople from "../../features/People/components/ManagePeople";

const PeopleManagementPage = () => {
  return (
    <Box className="flex flex-col gap-6 h-full">
      <Logo
        image="/src/assets/images/managePeople.png"
        direction="COL"
        title="Manage People"
        imageSize="w-40 h-40"
      />
      <ManagePeople />
    </Box>
  );
};

export default PeopleManagementPage;
