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
import { IQuery } from "../../../../interfaces";
import { useFindLicenseHandler } from "../hooks/useFindLicenseHandler";

interface IProps {
  licenseData?: ILicenseDetailsView;
  applicationId: IQuery | null;
}

const LicenseView = ({ licenseData, applicationId }: IProps) => {
  const { license } = useFindLicenseHandler(applicationId);

  const resolvedLicenseData: ILicenseDetailsView | null =
    licenseData || license?.data || null;

  return (
    <>
      <Box className="border rounded-lg p-4 flex items-start shadow-md bg-dataSections">
        {/* License Info Section */}
        <Box className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Box className="flex items-center">
            <FaCar className="mr-2 text-[#1F2937]" />
            <span>Class:</span>{" "}
            <span className="text-red-500 ml-2">
              {resolvedLicenseData?.className || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaUser className="mr-2 text-[#1F2937]" />
            <span>Name:</span>{" "}
            <span className="text-red-500 ml-2">
              {resolvedLicenseData?.fullName || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaIdCard className="mr-2 text-[#1F2937]" />
            <span>License ID:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.licenseId || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaIdCard className="mr-2 text-[#1F2937]" />
            <span>National No:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.nationalNo || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaGenderless className="mr-2 text-[#1F2937]" />
            <span>Gender:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.gender || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaCalendarAlt className="mr-2 text-[#1F2937]" />
            <span>Issue Date:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.issueDate
                ? new Date(resolvedLicenseData.issueDate).toLocaleDateString()
                : "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaQuestionCircle className="mr-2 text-[#1F2937]" />
            <span>Issue Reason:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.issueReason || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaStickyNote className="mr-2 text-[#1F2937]" />
            <span>Notes:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.notes || "No Notes"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaQuestionCircle className="mr-2 text-[#1F2937]" />
            <span>Is Active?</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.isActive ? "Yes" : "No"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaCalendarAlt className="mr-2 text-[#1F2937]" />
            <span>Date of Birth:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.dateOfBirth
                ? new Date(resolvedLicenseData.dateOfBirth).toLocaleDateString()
                : "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaIdCard className="mr-2 text-[#1F2937]" />
            <span>Driver ID:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.driverId || "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaCalendarAlt className="mr-2 text-[#1F2937]" />
            <span>Expiration Date:</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.expirationDate
                ? new Date(
                    resolvedLicenseData.expirationDate
                  ).toLocaleDateString()
                : "[Not Provided]"}
            </span>
          </Box>
          <Box className="flex items-center">
            <FaQuestionCircle className="mr-2 text-[#1F2937]" />
            <span>Is Detained?</span>{" "}
            <span className="ml-2">
              {resolvedLicenseData?.isDetain ? "Yes" : "No"}
            </span>
          </Box>
        </Box>

        {/* Personal Image */}
        <Box className="flex-shrink-0 ml-6">
          <img
            src={"https://via.placeholder.com/150"}
            alt="Personal"
            className="rounded-full w-40 h-40 object-cover shadow-md"
          />
        </Box>
      </Box>
    </>
  );
};

export default LicenseView;
