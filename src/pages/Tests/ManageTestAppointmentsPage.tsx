import { useSearchParams } from "react-router-dom";
import Box from "../../components/ui/Box";
import Logo from "../../components/ui/Logo";
import ManageTestAppointment from "../../features/Tests/Components/ManageTestAppointment";
import { EnumTestType } from "../../features/Tests/Enums";

// Define a mapping of testType to logo paths
const testTypeLogos: Record<EnumTestType, string> = {
  [EnumTestType.VisionTest]: "/src/assets/images/eyetest.png",
  [EnumTestType.PracticalTest]: "/src/assets/images/drivingTest.png",
  [EnumTestType.WrittenTest]: "/src/assets/images/WrittenTest.png",
};

// Define a mapping of testType to titles
const testTypeTitles: Record<EnumTestType, string> = {
  [EnumTestType.VisionTest]: "Vision Test Appointments",
  [EnumTestType.PracticalTest]: "Practical Test Appointments",
  [EnumTestType.WrittenTest]: "Written Test Appointments",
};

const ManageTestAppointmentsPage = () => {
  const [searchParams] = useSearchParams();
  const testTypeParam = searchParams.get("test-type");
  const localDrivingApplicationId = searchParams.get(
    "local-driving-application-id"
  );

  return (
    <Box className="h-[100%] flex flex-col">
      <Logo
        image={testTypeLogos[Number(testTypeParam) as EnumTestType]}
        title={testTypeTitles[Number(testTypeParam) as EnumTestType]}
        direction="ROW"
      />
      <ManageTestAppointment
        TestType={Number(testTypeParam) as EnumTestType}
        localDrivingApplicationId={localDrivingApplicationId!}
      />
    </Box>
  );
};

export default ManageTestAppointmentsPage;
