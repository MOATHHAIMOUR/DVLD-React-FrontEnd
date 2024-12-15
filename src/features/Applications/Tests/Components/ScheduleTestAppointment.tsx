import { useNavigate } from "react-router-dom";
import { useFetchApplicationTypesQuery } from "../../shared/store/ApplicationApiSlice";
import { EnumApplicationType } from "../../LocalDrivingApplication/Enums";
import { BuildQuery } from "../../../../utils";
import { useScheduleTest } from "../hooks/useAddScheduleTest";
import { useRef, useState } from "react";
import DatePickerComponent, {
  DatePickerRef,
} from "../../../../components/ui/DatePickerComponent";
import Box from "../../../../components/ui/Box";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import { AiFillIdcard, AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineDriveEta } from "react-icons/md";
import { FaMoneyBillAlt, FaSave, FaUserCircle } from "react-icons/fa";
import { BsCardList } from "react-icons/bs";
import ErrorMsg from "../../../../components/ui/ErrorMsg";
import Button from "../../../../components/ui/Button";
import { useFetchScheduleTestInfoViewQuery } from "../Store/TestApiSlice";
import { EnumTestType } from "../Enums";

interface IProps {
  localDrivingApplicationId: string;
  TestTypeId: EnumTestType;
  isRetake: boolean;
}

const ScheduleTestAppointment = ({
  TestTypeId,
  localDrivingApplicationId,
  isRetake,
}: IProps) => {
  //
  //
  //
  //
  const { data: ApplicationTypes } = useFetchApplicationTypesQuery(null, {
    skip: !isRetake,
  });

  const navigate = useNavigate();
  // extract retake test info
  const Retake = ApplicationTypes?.data.find(
    (a) => a.applicationTypeId === EnumApplicationType.RetakeTest
  );

  const { data: ScheduleTestInfoView } = useFetchScheduleTestInfoViewQuery(
    BuildQuery({
      AdvanceFilters: [
        {
          FilterBy: "LocalDrivingApplicationId",
          FilterValue: localDrivingApplicationId,
        },
        {
          FilterBy: "TestTypeId",
          FilterValue: TestTypeId.toString(),
        },
      ],
    })
  );

  const {
    handleScheduleTest,
    error: ScheduleTestError,
    isLoading,
  } = useScheduleTest();

  const datePickerRef = useRef<DatePickerRef>(null);

  const [error, setError] = useState<string | null>(null);

  function onChangeDate(Date: Date) {
    if (!Date) setError("You must pick time first");
    else setError(null);
  }

  async function handleOnSave() {
    if (!datePickerRef.current?.getSelectedDate()) {
      setError("You must pick time first");
      return;
    }

    if (ScheduleTestInfoView) {
      await handleScheduleTest({
        createdByUserId: 439,
        localDrivingLicenseApplicationId: Number(localDrivingApplicationId),
        testTypeId: TestTypeId,
      });

      navigate(
        `/tests/manage-appointment?test-type=${TestTypeId}&local-driving-application-id=${localDrivingApplicationId}`
      );
    }
  }
  return (
    <Box className="mt-8 p-6 flex flex-col gap-4 bg-gray-100 ">
      <ErrorHandler error={ScheduleTestError} />
      {/* Driving License Application Info */}
      <Box className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4">
          Driving License Application Info
        </h2>
        <Box className="grid grid-cols-2 gap-4">
          <Box className="flex items-center space-x-2">
            <AiFillIdcard className="text-blue-500" />
            <span className="font-medium">D.L.App.ID:</span>
            <span>
              {ScheduleTestInfoView?.data.localDrivingLicenseApplicationId}
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <MdOutlineDriveEta className="text-green-500" />
            <span className="font-medium">D. Class:</span>
            <span>{ScheduleTestInfoView?.data.className}</span>
          </Box>
          <Box className="flex items-center space-x-2">
            <FaUserCircle className="text-yellow-500" />
            <span className="font-medium">Name:</span>
            <span>
              {ScheduleTestInfoView?.data.firstName +
                " " +
                ScheduleTestInfoView?.data.lastName}
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <BsCardList className="text-red-500" />
            <span className="font-medium">Trial:</span>
            <span>{ScheduleTestInfoView?.data.tries}</span>
          </Box>
          <Box className="flex items-center space-x-2">
            <AiOutlineCalendar className="text-gray-500" />
            <span className="font-medium">Date:</span>
            <DatePickerComponent
              onChange={onChangeDate}
              ref={datePickerRef}
              className="w-full"
            />
            {error && <ErrorMsg message={error} />}
          </Box>
          <Box className="flex items-center space-x-2">
            <FaMoneyBillAlt className="text-green-500" />
            <span className="font-medium">Fees:</span>
            <span>${ScheduleTestInfoView?.data.testTypeFees}</span>
          </Box>
        </Box>
      </Box>

      {/* Retake Test Info */}
      <Box disabled={!isRetake} className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Retake Test Info</h2>
        <Box className="grid grid-cols-2 gap-4">
          <Box className="flex items-center space-x-2">
            <FaMoneyBillAlt className="text-green-500" />
            <span className="font-medium">R.App.Fees:</span>
            <span>${Retake?.applicationFees || "NA"}</span>
          </Box>
          <Box className="flex items-center space-x-2">
            <FaMoneyBillAlt className="text-green-500" />
            <span className="font-medium">Total Fees:</span>
            <span>
              $
              {(Retake?.applicationFees ?? 0) +
                (ScheduleTestInfoView?.data.testTypeFees ?? 0) || "NA"}
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <AiFillIdcard className="text-blue-500" />
            <span className="font-medium">R.Test.App.ID:</span>
            <span>N/A</span>
          </Box>
        </Box>
      </Box>
      <Box className="mt-4 flex justify-end">
        <Button
          isLoading={isLoading}
          onClick={handleOnSave}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover"
        >
          <FaSave />
          <span>Save</span>
        </Button>
      </Box>
    </Box>
  );
};

export default ScheduleTestAppointment;
