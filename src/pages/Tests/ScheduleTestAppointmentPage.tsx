import { useSearchParams } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import { EnumTestType } from "../../features/Applications/Tests/Enums";
import ScheduleTestAppointment from "../../features/Applications/Tests/Components/ScheduleTestAppointment";
// Define a mapping of testType to logo paths
const testTypeLogos: Record<EnumTestType, string> = {
  [EnumTestType.VisionTest]: "/src/assets/images/eyetest.png",
  [EnumTestType.PracticalTest]: "/src/assets/images/drivingTest.png",
  [EnumTestType.WrittenTest]: "/src/assets/images/WrittenTest.png",
};

// Define a mapping of testType to titles
const testTypeTitles: Record<EnumTestType, string> = {
  [EnumTestType.VisionTest]: "Schedule Vision Test Appointment",
  [EnumTestType.PracticalTest]: "Schedule Practical Test Appointment",
  [EnumTestType.WrittenTest]: "Schedule Written Test Appointment",
};

const ScheduleTestAppointmentPage = () => {
  const [searchParams] = useSearchParams();

  // Extract the query parameters
  const localDrivingApplicationId = searchParams.get(
    "local-driving-application-id"
  );
  const isRetake = searchParams.get("is-retake");
  const testTypeParam = searchParams.get("test-type");

  // Convert query parameter to Enum
  const testType: EnumTestType | null =
    testTypeParam && Object.values(EnumTestType).includes(Number(testTypeParam))
      ? (Number(testTypeParam) as EnumTestType)
      : null;

  // Get the logo path or use a fallback if testType is invalid
  const logoPath = testType
    ? testTypeLogos[testType]
    : "/src/assets/images/default.png";

  const title = testTypeTitles[testType!];

  return (
    <>
      <Logo
        direction="ROW"
        image={logoPath}
        title={`${isRetake ? "Retake: " : ""}${title}`}
      />
      <ScheduleTestAppointment
        TestTypeId={Number(testType) as EnumTestType}
        localDrivingApplicationId={localDrivingApplicationId!}
        isRetake={isRetake === "true"}
      />
    </>
  );
};

export default ScheduleTestAppointmentPage;
