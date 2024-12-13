import { toast } from "react-toastify";
import { BuildSimpleQuery } from "../../../utils";
import { IUserView } from "../interfaces";
import { useFetchUserQuery } from "../store/UserApiSlice";

interface IProps {
  userId?: number;
  userDetail?: IUserView;
}

const UserDetail = ({ userId, userDetail }: IProps) => {
  const {
    data: response,
    isFetching,
    isLoading,
    isSuccess,
    isError,
  } = useFetchUserQuery(BuildSimpleQuery("UserId", userId!), {
    skip: userId === undefined,
  });

  const userData: IUserView | null = (response?.data || userDetail) ?? null;

  if (isLoading || isFetching) return <p>Loading....</p>;
  if (isSuccess) toast.success("Person is Fetched");
  if (isError) toast.error("person not found");
  //get the data form base Person response

  /* ────────────── Render  ────────────── */

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 p-6 gap-6 h-[100%] rounded-lg shadow-lg">
      {/* User Information Section */}
      <div className="grid grid-cols-2 gap-10 items-center">
        {/* Person ID */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Person ID
          </label>
          <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <i className="fas fa-id-card text-blue-400 mr-3"></i>
            <span className="text-gray-800 text-sm">
              {userData?.personId || "N/A"}
            </span>
          </div>
        </div>

        {/* User ID */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            User ID
          </label>
          <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <i className="fas fa-user text-green-400 mr-3"></i>
            <span className="text-gray-800 text-sm">
              {userData?.userId || "N/A"}
            </span>
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Username
          </label>
          <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <i className="fas fa-user-circle text-purple-400 mr-3"></i>
            <span className="text-gray-800 text-sm">
              {userData?.username || "N/A"}
            </span>
          </div>
        </div>

        {/* Is Active */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Active Status
          </label>
          <div className="flex items-center bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <i
              className={`fas ${
                userData?.isActive
                  ? "fa-check-circle text-green-400"
                  : "fa-times-circle text-red-400"
              } mr-3`}
            ></i>
            <span className="text-gray-800 text-sm">
              {userData?.isActive ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Picture or Placeholder */}
      {/* <div className="flex justify-center items-center bg-white rounded-lg shadow-md border border-gray-200">
        {userData?.profilePicture ? (
          <img
            src={userData.profilePicture}
            alt="User Profile"
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <i className="fas fa-user-circle text-gray-300 text-6xl"></i>
        )}
      </div> */}
    </div>
  );
};

export default UserDetail;
