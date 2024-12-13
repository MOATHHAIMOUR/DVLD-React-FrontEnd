import { FaIdCard, FaRedoAlt, FaUser } from "react-icons/fa";
import { MdOutlineDriveEta } from "react-icons/md";
import Box from "../../../components/ui/Box";
import Button from "../../../components/ui/Button";
import { useTestResultHandler } from "../hooks/useAddTestResult";
import { useLazyFetchScheduleTestInfoViewQuery } from "../Store/TestApiSlice";
import { BuildQuery } from "../../../utils";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { useEffect, useRef, useState } from "react";
import ErrorMsg from "../../../components/ui/ErrorMsg";

interface IProps {
  localDrivingApplicationId: string;
  testType: string;
}

const TakeTestForm = ({ localDrivingApplicationId, testType }: IProps) => {
  const {
    onSaveTestResultHandler,
    isLoading,
    error: AddTestError,
  } = useTestResultHandler();

  const [triggerFetch, { data: ScheduleTestView, error: FetchError }] =
    useLazyFetchScheduleTestInfoViewQuery();

  const selectedTestResultRef = useRef<boolean | null>(null);
  const TestNotesRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    // Trigger fetch on mount
    triggerFetch(
      BuildQuery({
        AdvanceFilters: [
          {
            FilterBy: "LocalDrivingApplicationId",
            FilterValue: localDrivingApplicationId,
          },
          {
            FilterBy: "TestTypeId",
            FilterValue: testType,
          },
        ],
      })
    );
  }, [localDrivingApplicationId, testType, triggerFetch]);

  const [error, setError] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    if (value === "Pass") {
      selectedTestResultRef.current = true;
    } else {
      selectedTestResultRef.current = false;
    }
  };

  async function onTakeTestHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Fix the typo here
    if (selectedTestResultRef.current === null) {
      setError("Please choose Test Result First");
      return;
    }
    if (ScheduleTestView?.data)
      await onSaveTestResultHandler({
        createdByUserId: 439,
        notes: TestNotesRef.current.value,
        testAppointmentId: ScheduleTestView?.data.testAppointmentId,
        testResult: selectedTestResultRef.current,
      });
  }

  return (
    <Box className="p-8  bg-gray-100 rounded-lg shadow-lg mt-5  mx-auto">
      <ErrorHandler error={FetchError || AddTestError} />
      {/* Title */}
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
        Take Test
      </h1>

      <form onSubmit={(e) => onTakeTestHandler(e)}>
        <Box className="border border-gray-200 bg-white p-8 rounded-lg shadow-sm space-y-6">
          {/* Section: Main Info */}
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Box className="flex items-center gap-3">
              <FaIdCard className="text-primary text-xl" />
              <span className="font-semibold text-gray-700">D.L. App ID:</span>
              <span className="text-gray-600">
                {ScheduleTestView?.data?.localDrivingLicenseApplicationId ||
                  "N/A"}
              </span>
            </Box>

            <Box className="flex items-center gap-3">
              <MdOutlineDriveEta className="text-[#1F2937] text-xl" />
              <span className="font-semibold text-gray-700">D. Class:</span>
              <span className="text-gray-600">
                {ScheduleTestView?.data?.className || "N/A"}
              </span>
            </Box>

            <Box className="flex items-center gap-3">
              <FaUser className="text-[#1F2937] text-xl" />
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-600">
                {ScheduleTestView?.data?.firstName}{" "}
                {ScheduleTestView?.data?.lastName}
              </span>
            </Box>

            <Box className="flex items-center gap-3">
              <FaRedoAlt className="text-[#1F2937] text-xl" />
              <span className="font-semibold text-gray-700">Trial:</span>
              <span className="text-gray-600">
                {ScheduleTestView?.data?.tries || 0}
              </span>
            </Box>
          </Box>

          {/* Section: Result Information */}
          <Box className="border-t border-gray-200 pt-3 mb-8">
            <h4 className="font-semibold text-lg text-gray-800 mb-4">
              Result Information
            </h4>
            <Box className="flex items-center gap-4 ">
              <p className="font-semibold">Test Result: </p>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="testResult"
                  value="Pass"
                  id="pass"
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="hidden peer"
                />
                <label
                  htmlFor="pass"
                  className="cursor-pointer rounded-lg border px-4 py-2 text-center peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:bg-gray-100"
                >
                  Pass
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="testResult"
                  value="Fail"
                  id="fail"
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="hidden peer"
                />
                <label
                  htmlFor="fail"
                  className="cursor-pointer rounded-lg border px-4 py-2 text-center peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:bg-gray-100"
                >
                  Fail
                </label>
              </div>
              {error && <ErrorMsg message={error} />}
            </Box>

            {/* Notes Section */}
            <Box className="flex flex-col mt-4 gap-2 mb-6">
              <label className="font-semibold text-gray-700" htmlFor="notes">
                Notes:
              </label>
              <textarea
                ref={TestNotesRef}
                id="notes"
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any relevant notes..."
              ></textarea>
            </Box>

            {/* Action Buttons */}
            <Box className="flex justify-end gap-4">
              <Button
                type="submit"
                className="bg-primary ml-auto text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                disabled={isLoading}
                isLoading={isLoading}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default TakeTestForm;
