import { FaMoneyBillAlt, FaUserCircle } from "react-icons/fa";
import { MdOutlineDriveEta } from "react-icons/md";
import Box from "../../../components/ui/Box";
import { EnumTestType } from "../Enums";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { useFetchTestLocalDrivingApplicationAppointmentViewQuery } from "../Store/TestApiSlice";
import { AiFillIdcard, AiOutlineCalendar } from "react-icons/ai";
import { BsCardList } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import ErrorHandler from "../../../components/ui/ErrorHandler";

interface IProps {
  TestType: EnumTestType;
  localDrivingApplicationId: string;
}

const TestAppointmentView = ({ localDrivingApplicationId }: IProps) => {
  //
  //
  //

  /* ────────────── REDUX API  ────────────── */
  const {
    data: TestLocalDrivingApplicationAppointmentViewResponse,
    isLoading,
    error: TestLocalDrivingApplicationAppointmentViewResponseError,
  } = useFetchTestLocalDrivingApplicationAppointmentViewQuery(
    localDrivingApplicationId
  );

  /* ────────────── STATE & REF  ────────────── */

  /* ────────────── Derived Values  ────────────── */

  /* ────────────── Render  ────────────── */

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box className=" bg-gray-100 rounded-md">
      <ErrorHandler
        error={TestLocalDrivingApplicationAppointmentViewResponseError}
      />
      {/* Driving License Application Info */}
      <Box className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-bold mb-4">
          Driving License Application Info
        </h2>
        <Box className="grid grid-cols-2 gap-4">
          <Box className="flex items-center space-x-2">
            <AiFillIdcard className="text-blue-500" />
            <span className="font-medium">D.L.App ID:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .localDrivingLicenseApplicationId
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <MdOutlineDriveEta className="text-green-500" />
            <span className="font-medium">Applied For License:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .className
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <BsCardList className="text-yellow-500" />
            <span className="font-medium">Passed Tests:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .passedTests
              }
              /3
            </span>
          </Box>
          <button className="text-blue-500 underline">Show License Info</button>
        </Box>
      </Box>

      {/* Application Basic Info */}
      <Box className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Application Basic Info</h2>
        <Box className="grid grid-cols-2 gap-4">
          <Box className="flex items-center space-x-2">
            <AiFillIdcard className="text-blue-500" />
            <span className="font-medium">Application ID:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .applicationId
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .applicationStatus
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <FaMoneyBillAlt className="text-green-500" />
            <span className="font-medium">Fees:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .paidFees
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <span className="font-medium">Type:</span>
            <span>New Local Driving License Service</span>
          </Box>
          <Box className="flex items-center space-x-2">
            <FaUserCircle className="text-yellow-500" />
            <span className="font-medium">Applicant:</span>
            <span>
              {TestLocalDrivingApplicationAppointmentViewResponse?.data
                .firstName +
                " " +
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .lastName}
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <AiOutlineCalendar className="text-gray-500" />
            <span className="font-medium">Date:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .applicationDate
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <AiOutlineCalendar className="text-gray-500" />
            <span className="font-medium">Status Date:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .lastStatusDate
              }
            </span>
          </Box>
          <Box className="flex items-center space-x-2">
            <span className="font-medium">Created By:</span>
            <span>
              {
                TestLocalDrivingApplicationAppointmentViewResponse?.data
                  .username
              }
            </span>
          </Box>
        </Box>
        <Box className="mt-4">
          <NavLink to={""} className="text-blue-500 underline">
            View Person Info
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default TestAppointmentView;
