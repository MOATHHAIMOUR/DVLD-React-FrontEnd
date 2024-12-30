import {
  FaMoneyBillAlt,
  FaUserCircle,
  FaIdCardAlt,
  FaClipboardList,
} from "react-icons/fa";
import { MdOutlineDriveEta } from "react-icons/md";
import {
  AiFillIdcard,
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { BsCardList } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import Box from "../../../../components/ui/Box";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import { ITestLocalDrivingLicenseAppointmentView } from "../../Tests/interfaces";
import { IGenericApiResponse } from "../../../../interfaces/IApiResponse";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface IProps {
  response?: IGenericApiResponse<ITestLocalDrivingLicenseAppointmentView>;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}

const TestLocalDrivingView = ({ response, isLoading, error }: IProps) => {
  /* ────────────── REDUX API  ────────────── */

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box className=" rounded-md">
      <ErrorHandler error={error} />

      {/* Driving License Application Info */}
      <Box className=" rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4  flex items-center space-x-2">
          <MdOutlineDriveEta size={20} />
          <span>Driving License Application Info</span>
        </h2>

        <Box className="grid grid-cols-2 gap-4">
          <Box className="flex items-center space-x-2">
            <AiFillIdcard className="text-blue-500" size={20} />
            <span className="font-medium">D.L.App ID:</span>
            <span>{response?.data.localDrivingLicenseApplicationId}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <MdOutlineDriveEta className="text-green-500" size={20} />
            <span className="font-medium">Applied For License:</span>
            <span>{response?.data.className}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <BsCardList className="text-yellow-500" size={20} />
            <span className="font-medium">Passed Tests:</span>
            <span>
              {response?.data.passedTests}
              /3
            </span>
          </Box>
        </Box>
      </Box>

      {/* Application Basic Info */}
      <Box className=" rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4  flex items-center space-x-2">
          <FaIdCardAlt size={16} />
          <span>Application Basic Info</span>
        </h2>

        <Box className="grid grid-cols-2 gap-4">
          <Box className="flex items-center space-x-2">
            <AiFillIdcard className="text-blue-500" size={20} />
            <span className="font-medium">Application ID:</span>
            <span>{response?.data.applicationId}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <AiOutlineCheckCircle className="text-green-500" size={20} />
            <span className="font-medium">Status:</span>
            <span>{response?.data.applicationStatus}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <FaMoneyBillAlt className="text-green-500" size={20} />
            <span className="font-medium">Fees:</span>
            <span>{response?.data.paidFees}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <FaClipboardList className="text-purple-500" size={20} />
            <span className="font-medium">Type:</span>
            <span>New Local Driving License Service</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <FaUserCircle className="text-yellow-500" size={20} />
            <span className="font-medium">Applicant:</span>
            <span>
              {response?.data.firstName + " " + response?.data.lastName}
            </span>
          </Box>

          <Box className="flex items-center space-x-2">
            <AiOutlineCalendar className="text-blue-500" size={20} />
            <span className="font-medium">Date:</span>
            <span>{response?.data.applicationDate}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <AiOutlineClockCircle className="text-blue-500" size={20} />
            <span className="font-medium">Status Date:</span>
            <span>{response?.data.lastStatusDate}</span>
          </Box>

          <Box className="flex items-center space-x-2">
            <AiOutlineUser className="text-blue-500" size={20} />
            <span className="font-medium">Created By:</span>
            <span>{response?.data.username}</span>
          </Box>
        </Box>

        {/* View Person Info */}
        <Box className="mt-4">
          <NavLink
            to={`/people/person-details?personId=${response?.data.personId}`}
            className="text-blue-600 underline hover:text-blue-800 flex items-center space-x-2"
          >
            <FaUserCircle size={16} />
            <span>View Person Info</span>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default TestLocalDrivingView;
