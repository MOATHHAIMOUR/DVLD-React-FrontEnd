import { useRef } from "react";
import Box from "../../../../components/ui/Box";
import Button from "../../../../components/ui/Button";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import TestLocalDrivingView from "../../shared/Components/TestLocalDrivingView";
import { useFetchTestLocalDrivingApplicationAppointmentViewQuery } from "../../shared/store/ApplicationApiSlice";
import { ConvertStringClassNameToEnumLicenseClass } from "../Enums";
import { toast } from "react-toastify";
import { useAddLocalLicenseHandler } from "../hooks/useAddLocalLicenseHandler";
import { useNavigate } from "react-router-dom";

interface IProps {
  localDrivingApplicationId: string;
}

const AddNewLocalLicense = ({ localDrivingApplicationId }: IProps) => {
  // Hook for adding a license
  const {
    addLicense,
    isLoading: AddingLoading,
    error: AddingError,
  } = useAddLocalLicenseHandler();

  const navigate = useNavigate();

  // Fetch the driving application view
  const {
    data: applicationData,
    isLoading: FetchingLoading,
    error: ErrorFetchingData,
  } = useFetchTestLocalDrivingApplicationAppointmentViewQuery(
    localDrivingApplicationId
  );

  // Add License Handler
  async function AddLicenseHandler() {
    if (applicationData?.data) {
      const classId = ConvertStringClassNameToEnumLicenseClass(
        applicationData.data.className
      );
      if (classId !== null) {
        await addLicense({
          applicationId: applicationData.data.applicationId, // Application ID
          createdByUserId: 10, // Hardcoded User ID (replace with dynamic if needed)
          licenseClassId: classId, // Converted license class ID
          notes: textAreaRef.current.value, // Notes from textarea ref
        });
        navigate("/local-driving-license/manage-local-driving-licenses");
      } else {
        toast.error("Invalid license class name:");
      }
    } else {
      toast.error("No application data available");
    }
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null!);
  return (
    <Box className="flex flex-col">
      {/* Display any errors */}
      <ErrorHandler error={AddingError || ErrorFetchingData} />

      {/* TestLocalDrivingView Component */}
      <TestLocalDrivingView
        response={applicationData}
        error={ErrorFetchingData}
        isLoading={FetchingLoading}
      />

      {/* Add Notes Section */}
      <Box className=" shadow-md mt-6 p-4 border rounded-lg bg-gray-00">
        <h2 className="text-lg font-semibold mb-2">Add Notes</h2>
        <textarea
          ref={textAreaRef}
          placeholder="Write your notes here..."
          className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        {/* Submit Button */}
        <Box className="flex justify-end mt-4">
          <Button
            fullWidth
            onClick={AddLicenseHandler}
            isLoading={AddingLoading}
            className="px-4 py-3 w-36 bg-primary text-primary-foreground rounded hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Issue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewLocalLicense;
