import { toast } from "react-toastify";
import Box from "../../../components/ui/Box";
import FileUploader from "../../../components/ui/FileUploader";
import { BuildSimpleQuery } from "../../../utils";
import { IFetchPerson } from "../interfaces";
import { useFetchPersonQuery } from "../store/PeopleApiSlice";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { ConvertGenderEnumToString } from "../../../Enums";

interface IProps {
  personId?: number;
  personDetail?: IFetchPerson;
}

const PersonDetail = ({ personId, personDetail }: IProps) => {
  const {
    data: response,
    isFetching,
    isLoading,
    isError,
  } = useFetchPersonQuery(BuildSimpleQuery("personId", personId!), {
    skip: personId === undefined,
  });

  const personData: IFetchPerson =
    response?.data || personDetail || ({} as IFetchPerson);

  if (isFetching || isLoading) return <LoadingSpinner />;

  if (isError) {
    toast.error("Person not found");
    return null;
  }

  console.log("personData.image: " + personData.imagePath);

  return (
    <Box className="grid grid-cols-[1fr,auto] bg-gray-100 p-6 gap-10 h-[75%] rounded-lg shadow-md">
      <Box className="grid grid-cols-3 gap-6">
        {/* National Number */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-passport text-gray-400 mr-2"></i>
            <span className="text-black">{personData.firstName || "N/A"}</span>
          </Box>
        </Box>

        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Second Name
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-passport text-gray-400 mr-2"></i>
            <span className="text-black">{personData.secondName || "N/A"}</span>
          </Box>
        </Box>

        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Third Name
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-passport text-gray-400 mr-2"></i>
            <span className="text-black">{personData.thirdName || "N/A"}</span>
          </Box>
        </Box>

        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-passport text-gray-400 mr-2"></i>
            <span className="text-black">{personData.lastName || "N/A"}</span>
          </Box>
        </Box>

        {/* National Number */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            National Number
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-passport text-gray-400 mr-2"></i>
            <span className="text-black">{personData.nationalNo || "N/A"}</span>
          </Box>
        </Box>

        {/* Gender */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-venus-mars text-gray-400 mr-2"></i>
            <span className="text-black">
              {ConvertGenderEnumToString(personData.gender) ?? "N/A"}
            </span>
          </Box>
        </Box>

        {/* Date of Birth */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-calendar-alt text-gray-400 mr-2"></i>
            <span className="text-black">
              {personData.dateOfBirth || "Not provided"}
            </span>
          </Box>
        </Box>

        {/* Email */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1 ">
            Email
          </label>
          <Box className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary  flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-envelope text-gray-400 mr-2"></i>
            <span className="text-black ">
              {personData.email || "Not provided"}
            </span>
          </Box>
        </Box>

        {/* Phone */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-phone text-gray-400 mr-2"></i>
            <span className="text-black">
              {personData.phone || "Not provided"}
            </span>
          </Box>
        </Box>

        {/* Address */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
            <span className="text-black">
              {personData.address || "Not provided"}
            </span>
          </Box>
        </Box>

        {/* Country */}
        <Box className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Box className="flex items-center bg-white rounded-lg p-2">
            <i className="fas fa-flag text-gray-400 mr-2"></i>
            <span className="text-black">
              {personData.countryName || "Not provided"}
            </span>
          </Box>
        </Box>
      </Box>

      <Box className="flex flex-col w-[300px]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Image
        </h2>
        <FileUploader isReadOnly={true} value={personData?.imagePath} />
      </Box>
    </Box>
  );
};

export default PersonDetail;
