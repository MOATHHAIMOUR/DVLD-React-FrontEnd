import { toast } from "react-toastify";
import { BuildSimpleQuery } from "../../../utils";
import { IApiUser } from "../interfaces";
import { useFetchUsersQuery } from "../store/UserApiSlice";

interface IProps {
  userId?: number;
  personDetail?: IApiUser;
}

const UserDetail = ({ userId, personDetail }: IProps) => {
  const {
    data: response,
    isFetching,
    isLoading,
    isSuccess,
    isError,
  } = useFetchUsersQuery(BuildSimpleQuery("personId", userId!), {
    skip: userId === undefined,
  });

  if (isLoading || isFetching) return <p>Loading....</p>;
  if (isSuccess) toast.success("Person is Fetched");
  if (isError) toast.error("person not found");
  //get the data form base Person response

  /* ────────────── Render  ────────────── */

  const fieldsRender = Object.entries(personDetail || response?.data || {}).map(
    ([key, value]) => (
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
    )
  );

  return (
    <div className="grid grid-cols-[1fr,auto] bg-gray-50 p-6 gap-10 h-[100%] rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-6">{fieldsRender}</div>
    </div>
  );
};

export default UserDetail;
