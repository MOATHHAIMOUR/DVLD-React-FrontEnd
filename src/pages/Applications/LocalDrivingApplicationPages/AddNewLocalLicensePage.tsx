import { useParams } from "react-router-dom";
import Box from "../../../components/ui/Box";
import Logo from "../../../components/ui/Logo";
import AddNewLocalLicense from "../../../features/Applications/LocalDrivingApplication/Components/AddNewLocalLicense";

const AddNewLocalLicensePage = () => {
  const { localDrivingId } = useParams();
  return (
    <Box className="flex flex-col gap-6 h-full">
      <Logo
        image="/src/assets/images/license.png"
        direction="COL"
        title="Manage Local Driving Applications"
        imageSize="w-40 h-40"
      />
      <Box className="h-[100%]">
        <AddNewLocalLicense localDrivingApplicationId={localDrivingId!} />
      </Box>
    </Box>
  );
};

export default AddNewLocalLicensePage;
