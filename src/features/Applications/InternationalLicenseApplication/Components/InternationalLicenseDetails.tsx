import {
  FaUser,
  FaGlobe,
  FaCalendarAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import Box from "../../../../components/ui/Box";

const InternationalLicenseDetails = () => {
  return (
    <Box className=" p-6 bg-white border border-gray-300 rounded-md shadow-md">
      <Box className="flex justify-between items-center flex-wrap gap-4">
        <Box className=" flex flex-col gap-2">
          <Box className="mb-2 flex items-center">
            <FaUser className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Name:</span>
            <span className="ml-1 text-red-600">Mahmoud Omar Ali Almajed</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaGlobe className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Int. License ID:</span>
            <span className="ml-1">17</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaGlobe className="mr-2 text-[#1F2937]" />
            <span className="font-bold">License ID:</span>
            <span className="ml-1">25</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaGlobe className="mr-2 text-[#1F2937]" />
            <span className="font-bold">National No:</span>
            <span className="ml-1">N10</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaUser className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Gender:</span>
            <span className="ml-1">Male</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Issue Date:</span>
            <span className="ml-1">09/Oct/2023</span>
          </Box>
        </Box>

        {/* Right Column */}
        <Box className=" flex flex-col gap-2">
          <Box className="mb-2 flex items-center">
            <FaGlobe className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Application ID:</span>
            <span className="ml-1">126</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaQuestionCircle className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Is Active?</span>
            <span className="ml-1">Yes</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Date of Birth:</span>
            <span className="ml-1">09/Oct/2005</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaGlobe className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Driver ID:</span>
            <span className="ml-1">11</span>
          </Box>
          <Box className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-[#1F2937]" />
            <span className="font-bold">Expiration Date:</span>
            <span className="ml-1">09/Oct/2024</span>
          </Box>
        </Box>

        {/* Image */}
        <Box className="flex-shrink-0">
          <div className="w-40 h-40 rounded-full object-cover bg-slate-500"></div>
        </Box>
      </Box>
    </Box>
  );
};

export default InternationalLicenseDetails;
