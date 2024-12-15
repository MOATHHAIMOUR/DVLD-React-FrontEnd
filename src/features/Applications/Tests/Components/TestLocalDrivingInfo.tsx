import {
  FaIdCard,
  FaFileAlt,
  FaCalendarAlt,
  FaUserAlt,
  FaCarSide,
} from "react-icons/fa";
import { MdOutlineCheckBox } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useDrivingApplicationData from "../hooks/useDrivingApplicationData";

interface IProps {
  localDrivingApplicationId: string;
}
const TestLocalDrivingInfo = ({ localDrivingApplicationId }: IProps) => {
  const { data } = useDrivingApplicationData(localDrivingApplicationId!);
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Driving License Application Info */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          Driving License Application Info
        </h2>
        <div className="grid grid-cols-2 gap-4 border border-gray-300 p-4 rounded-lg bg-white">
          <div className="flex items-center">
            <FaIdCard className="text-blue-500 mr-2" />
            <span>
              D.L. App ID:{" "}
              <strong>{data?.data.localDrivingLicenseApplicationId}</strong>
            </span>
          </div>
          <div className="flex items-center">
            <FaCarSide className="text-blue-500 mr-2" />
            <span>
              Applied For License: <strong>{data?.data.className}</strong>
            </span>
          </div>
          <div className="flex items-center">
            <FaFileAlt className="text-blue-500 mr-2" />
            <span>Show License Info</span>
          </div>
          <div className="flex items-center">
            <MdOutlineCheckBox className="text-green-500 mr-2" />
            <span>
              Passed Tests: <strong>{data?.data.passedTests}/3</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Application Basic Info */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Application Basic Info</h2>
        <div className="border border-gray-300 p-4 rounded-lg bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FaIdCard className="text-blue-500 mr-2" />
              <span>
                ID: <strong>{data?.data.applicationId}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <span>
                Date: <strong>{data?.data.applicationDate}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <span>
                Status: <strong>{data?.data.applicationStatus}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <span>
                Status Date: <strong>{data?.data.lastStatusDate}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <span>
                Fees: <strong>{data?.data.paidFees}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <FaUserAlt className="text-blue-500 mr-2" />
              <span>
                Created By: <strong>{data?.data.username}</strong>
              </span>
            </div>
            <div className="col-span-2">
              <span>
                Type: <strong>{data?.data.applicationTypeTitle}</strong>
              </span>
            </div>
            <div className="col-span-2">
              <span>
                Applicant: <strong>{data?.data.firstName}</strong>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <NavLink
              to={"/person/"}
              className="text-blue-600 hover:underline font-semibold"
            >
              View Person Info
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLocalDrivingInfo;
