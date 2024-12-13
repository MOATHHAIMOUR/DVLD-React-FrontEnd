import { useSearchParams } from "react-router-dom";
import Box from "../../components/ui/Box";
import Logo from "../../components/ui/Logo";
import TestTypeInfo from "../../features/Tests/Components/TestTypeInfo";
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

const TestTypeInfoPage = () => {
  const [searchParams] = useSearchParams();
  const testTypeParam = searchParams.get("test-type");
  const localDrivingApplicationId = searchParams.get(
    "local-driving-application-id"
  );

  // Convert query parameter to Enum
  const testType: EnumTestType | null =
    testTypeParam && Object.values(EnumTestType).includes(Number(testTypeParam))
      ? (Number(testTypeParam) as EnumTestType)
      : null;

  const logoPath = testTypeLogos[testType!];

  const title = testTypeTitles[testType!];

  return (
    <Box className="flex flex-col gap-4">
      <Logo image={logoPath} direction="ROW" title={title} />
    </Box>
  );
};

export default TestTypeInfoPage;
