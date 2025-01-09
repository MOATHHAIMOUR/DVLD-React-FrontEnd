import { FaUserAlt } from "react-icons/fa";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

const OnlineOfflineStatus = () => {
  const isOnline = useAppSelector((state) => state.netWorkSlice.isOnline);
  const imagePath = useAppSelector((state) => state.auth.imagePath);
  console.log("imagePath: " + imagePath);
  const navigation = useNavigate();

  return (
    <div
      onClick={() => navigation("Account/Settings")}
      title={isOnline ? "Online" : "Offline"}
      className="cursor-pointer  flex items-center justify-center shadow-lg rounded-full "
    >
      <div className="relative">
        {/* Profile Circle */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-lg overflow-hidden">
          {imagePath ? (
            <img
              src={"/src/assets/images/profile.jpg"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserAlt size={20} className="text-gray-600" />
          )}
        </div>
        {/* Online/Offline Indicator */}
        <span
          className={`absolute bottom-[-2px] left-[-2px] w-4 h-4 rounded-full shadow-lg ${
            isOnline ? "bg-green-500 border-white" : "bg-red-500 border-white"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default OnlineOfflineStatus;
