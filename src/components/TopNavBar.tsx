import { useAppSelector } from "../store";
import OnlineOfflineStatus from "./OnlineOfflineStatus";
import ToggleEnArabic from "./ToggleEnArabic";
import { useTranslation } from "react-i18next";
import DateComponent from "./ui/DateComponent";

const TopNavBar = () => {
  const { t } = useTranslation();
  const authSlice = useAppSelector((state) => state.auth);
  return (
    <div className="bg-gray-50 shadow-md">
      <div className="mx-auto flex items-center justify-end xl:justify-between p-4  ">
        <div className="">
          <div className="flex flex-col">
            <h1 className="text-lg  font-semibold ">
              {t("Welcome")}, {authSlice.userName}
            </h1>
            <DateComponent />
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <OnlineOfflineStatus />
          <ToggleEnArabic />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
