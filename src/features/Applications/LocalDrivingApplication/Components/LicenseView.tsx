import {
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaCar,
  FaQuestionCircle,
  FaGenderless,
  FaStickyNote,
} from "react-icons/fa";
import Box from "../../../../components/ui/Box";
import { ILicenseDetailsView } from "../interfaces";

interface IProps {
  licenseData?: ILicenseDetailsView;
}

const LicenseView = ({ licenseData }: IProps) => {
  return (
    <>
      <Box className=" border text-nowrap rounded-lg p-4 flex items-start shadow-md  ">
        {/* License Info Section */}
        <Box className="flex-1 grid grid-cols-2 md:grid-cols-2 gap-6">
          <Box className="flex items-center">
            <FaCar className="mr-2 " />
            <span>Class:</span>{" "}
            <span className="text-red-500 ml-2">
              {licenseData?.className || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaUser className="mr-2 " />
            <span>Name:</span>{" "}
            <span className="text-red-500 ml-2">
              {licenseData?.fullName || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaIdCard className="mr-2 " />
            <span>License ID:</span>{" "}
            <span className="ml-2">
              {licenseData?.licenseId || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaIdCard className="mr-2 " />
            <span>National No:</span>{" "}
            <span className="ml-2">
              {licenseData?.nationalNo || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaGenderless className="mr-2 " />
            <span>Gender:</span>{" "}
            <span className="ml-2">
              {licenseData?.gender || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaCalendarAlt className="mr-2 " />
            <span>Issue Date:</span>{" "}
            <span className="ml-2">
              {licenseData?.issueDate
                ? new Date(licenseData.issueDate).toLocaleDateString()
                : "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaQuestionCircle className="mr-2 " />
            <span>Issue Reason:</span>{" "}
            <span className="ml-2">
              {licenseData?.issueReason || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaStickyNote className="mr-2 " />
            <span>Notes:</span>{" "}
            <span className="ml-2">{licenseData?.notes || "No Notes"}</span>
          </Box>
          <Box className="flex items-center">
            <FaQuestionCircle className="mr-2 " />
            <span>Is Active?</span>{" "}
            <span className="ml-2">{licenseData?.isActive ? "Yes" : "No"}</span>
          </Box>
          <Box className="flex items-center">
            <FaCalendarAlt className="mr-2 " />
            <span>Date of Birth:</span>{" "}
            <span className="ml-2">
              {licenseData?.dateOfBirth
                ? new Date(licenseData.dateOfBirth).toLocaleDateString()
                : "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaIdCard className="mr-2 " />
            <span>Driver ID:</span>{" "}
            <span className="ml-2">
              {licenseData?.driverId || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaCalendarAlt className="mr-2 " />
            <span>Expiration Date:</span>{" "}
            <span className="ml-2">
              {licenseData?.expirationDate
                ? new Date(licenseData.expirationDate).toLocaleDateString()
                : "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaQuestionCircle className="mr-2 " />
            <span>Is Detained?</span>{" "}
            <span className="ml-2">{licenseData?.isDetain ? "Yes" : "No"}</span>
          </Box>
        </Box>

        {/* Personal Image */}
        <Box className="flex-shrink-0 ml-6">
          <img
            src={licenseData?.imagePath}
            alt="Personal"
            className="rounded-full w-40 h-40 object-cover shadow-md"
          />
        </Box>
      </Box>
    </>
  );
};

export default LicenseView;
