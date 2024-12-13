import { useState } from "react";
import Box from "../../../../components/ui/Box";
import LookupPersonToDisplayInfo from "../../../People/components/LookupPersonToDisplayInfo";
import InternationalLicenseList from "../../InternationalLicenseApplication/Components/InternationalLicenseList";
import { TShowLicenseHistoryListType } from "../types";
import LocalDrivingLicenseViewList from "../../LocalDrivingApplication/Components/LocalDrivingLicenseViewList";

const ShowLicensesHistory = () => {
  const [listType, setListType] =
    useState<TShowLicenseHistoryListType>("InternationalList");

  return (
    <Box>
      <LookupPersonToDisplayInfo />
      {/* Tab Region */}
      <Box className="mt-8 p-4 border border-gray-300 rounded-lg shadow-lg">
        {/* Tab Buttons */}
        <div className="flex justify-start gap-4 border-b border-gray-200 pb-2">
          <button
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-all duration-300 ${
              listType === "localLicenseList"
                ? "bg-[#1F2937] text-white border-blue-500"
                : "bg-transparent text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setListType("localLicenseList")}
          >
            Local
          </button>
          <button
            className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-all duration-300 ${
              listType === "InternationalList"
                ? "bg-[#1F2937] text-white border-blue-500"
                : "bg-transparent text-[#1F2937] hover:text-blue-500"
            }`}
            onClick={() => setListType("InternationalList")}
          >
            Internationals
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {listType === "localLicenseList" && (
            <Box>
              <LocalDrivingLicenseViewList />
            </Box>
          )}
          {listType === "InternationalList" && <InternationalLicenseList />}
        </div>
      </Box>
    </Box>
  );
};

export default ShowLicensesHistory;
