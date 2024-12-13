import { useSearchParams } from "react-router-dom";
import Box from "../../components/ui/Box";
import Logo from "../../components/ui/Logo";
import { EnumTestType } from "../../features/Tests/Enums";
import TakeTestForm from "../../features/Tests/Components/TakeTestForm";

// Define a mapping of testType to logo paths
const testTypeLogos: Record<EnumTestType, string> = {
  [EnumTestType.VisionTest]: "/src/assets/images/eyetest.png",
  [EnumTestType.PracticalTest]: "/src/assets/images/drivingTest.png",
  [EnumTestType.WrittenTest]: "/src/assets/images/WrittenTest.png",
};

const testTypeTitles: Record<EnumTestType, string> = {
  [EnumTestType.VisionTest]: "Take Vision Test",
  [EnumTestType.PracticalTest]: "Take Practical Test",
  [EnumTestType.WrittenTest]: "Take Written Test ",
};

const TakeTestPage = () => {
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
  const title = testTypeTitles[testType!]!;
  return (
    <Box className="flex flex-col gap-4">
      <Logo image={logoPath} direction="ROW" title={title} />
      <TakeTestForm
        testType={testTypeParam!}
        localDrivingApplicationId={localDrivingApplicationId!}
      />
    </Box>
  );
};

export default TakeTestPage;
