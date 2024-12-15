import Box from "../../../../components/ui/Box";
import TestLocalDrivingView from "../../shared/Components/TestLocalDrivingView";

interface IProps {
  localDrivingApplicationId: string;
}

const AddNewLocalLicense = ({ localDrivingApplicationId }: IProps) => {
  return (
    <Box>
      <TestLocalDrivingView
        localDrivingApplicationId={localDrivingApplicationId}
      />
    </Box>
  );
};

export default AddNewLocalLicense;
