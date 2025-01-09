import { useTranslation } from "react-i18next";
import Box from "../../components/ui/Box";
import Logo from "../../components/ui/Logo";
import ManagePeople from "../../features/People/components/ManagePeople";

const PeopleManagementPage = () => {
  const { t } = useTranslation();
  return (
    <Box className="flex flex-col gap-6 h-full px-8 py-8 ">
      <Logo
        image="/src/assets/images/managePeople.png"
        direction="COL"
        title={t("People.title")}
        imageSize="w-40 h-40"
      />
      <ManagePeople />
    </Box>
  );
};

export default PeopleManagementPage;
