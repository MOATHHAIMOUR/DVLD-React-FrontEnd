import { useNavigate } from "react-router-dom";
import { EnumTestType } from "../Enums";
import { useFetchTestAppointmentsQuery } from "../Store/TestApiSlice";
import { toast } from "react-toastify";
import Box from "../../../../components/ui/Box";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import TestLocalDrivingView from "../../shared/Components/TestLocalDrivingView";
import Button from "../../../../components/ui/Button";
import TestAppointmentPerLocalIdPerTestTypeList from "./TestAppointmentPerLocalIdPerTestTypeList";

interface IProps {
  TestType: EnumTestType;
  localDrivingApplicationId: string;
}

const ManageTestAppointment = ({
  TestType,
  localDrivingApplicationId,
}: IProps) => {
  const { data: TestAppointmentsResponse, error: TestAppointmentsError } =
    useFetchTestAppointmentsQuery({
      localDrivingApplication: +localDrivingApplicationId,
      testTypeId: TestType,
    });

  const navigate = useNavigate();

  /* ────────────── HANDLERS  ────────────── */

  function RegisterAppointmentHandler() {
    // is applicant pass the test
    const isApplicantPassTheTest = TestAppointmentsResponse?.data.find(
      (t) => t.testResult
    );

    if (isApplicantPassTheTest) {
      toast.error("Applicant is already pass the test, cant schedule new one");
      return;
    }

    // cheek if applicant has not locked appointment
    const isApplicantHasAppointmentNotLocked =
      TestAppointmentsResponse?.data.find((t) => t.isLocked === false);

    if (isApplicantHasAppointmentNotLocked) {
      toast.error(
        "Applicant is already has an active appointment, cant schedule new one"
      );
      return;
    }

    // here applicant dose not have an active appointment or pass the test
    // so here either applicant dose not take an appointment yet or he failed in prev exams
    const isRetakeTest =
      TestAppointmentsResponse?.data.some((t) => t.testResult === false) ??
      false;

    console.log("localDrivingApplicationId: " + localDrivingApplicationId);
    // applicant is allowed to get new appointment
    navigate(
      `/tests/schedule-test?local-driving-application-id=${localDrivingApplicationId}&test-type=${TestType}&is-retake=${isRetakeTest}`
    );
  }

  console.log(
    "TestAppointmentsResponse?.data: " +
      TestAppointmentsResponse?.data[0]?.appointmentDate
  );
  return (
    <Box className="mt-8 p-6 bg-gray-100 rounded-md">
      <ErrorHandler error={TestAppointmentsError} />
      <TestLocalDrivingView
        localDrivingApplicationId={localDrivingApplicationId}
      />

      <Button
        onClick={RegisterAppointmentHandler}
        className="my-6 bg-primary hover:bg-primaryHover p-2 rounded-md text-[15px] ml-auto text-white"
      >
        Schedule Appointment
      </Button>
      <Box className="">
        <TestAppointmentPerLocalIdPerTestTypeList
          localDrivingApplicationId={localDrivingApplicationId}
          testType={TestType}
          testAppointmentViewData={TestAppointmentsResponse?.data ?? []}
        />
      </Box>
    </Box>
  );
};

export default ManageTestAppointment;
