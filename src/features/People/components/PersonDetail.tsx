import Box from "../../../components/ui/Box";
import FileUploader from "../../../components/ui/FileUploader";
import { BuildSimpleQuery } from "../../../utils";
import { IPersonDetailData } from "../interfaces";
import { useFetchPersonQuery } from "../store/PeopleApiSlice";

interface IProps {
  personId: number;
}

const PersonDetail = ({ personId }: IProps) => {
  const { data: response } = useFetchPersonQuery(
    BuildSimpleQuery("personId", personId.toString())
  );

  //get the data form base Person response
  let person: IPersonDetailData | null = null;
  if (response)
    person = {
      personId: response?.data.personId,
      nationalNo: response?.data.nationalNo,
      firstName: response?.data.firstName,
      secondName: response?.data.secondName,
      thirdName: response?.data.thirdName,
      lastName: response?.data.lastName,
      gender: response?.data.gender,
      phone: response?.data.phone,
      email: response?.data.email,
      address: response?.data.address,
      dateOfBirth: response?.data.dateOfBirth,
      imagePath: response?.data.imagePath ?? null,
      countryName: response?.data.countryName,
    };

  /* ────────────── Render  ────────────── */

  const excludedKeys = ["imagePath"]; // Keys to exclude
  const fieldsRender = Object.entries(person || {})
    .filter(([key]) => !excludedKeys.includes(key)) // Exclude unwanted keys
    .map(([key, value]) => (
      <div key={key} className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          {key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}{" "}
          {/* Format label */}
        </label>
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
          <i className="fas fa-id-card text-gray-400 mr-2"></i>
          <span className="text-gray-600">{value || "N/A"}</span>
        </div>
      </div>
    ));

  return (
    <div className="grid grid-cols-[1fr,auto] bg-gray-50 p-6 gap-10 h-[100%] rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-6">{fieldsRender}</div>

      <Box className="flex flex-col w-[300px] ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Image</h2>
        <FileUploader />
      </Box>
    </div>
  );
};

export default PersonDetail;
