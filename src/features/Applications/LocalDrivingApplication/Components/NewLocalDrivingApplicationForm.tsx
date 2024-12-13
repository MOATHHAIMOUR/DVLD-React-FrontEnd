import { Step, Stepper } from "react-form-stepper";
import Box from "../../../../components/ui/Box";
import { useRef, useState } from "react";
import LookupPersonToDisplayInfo from "../../../People/components/LookupPersonToDisplayInfo";
import Button from "../../../../components/ui/Button";
import { useAppSelector } from "../../../../store";
import SelectMenu from "../../../../components/ui/SelectMenu";
import { useAddNewLocalDrivingLicense } from "../hooks/useAddNewLocalDrivingLicenseApplication";
import { EnumApplicationType, EnumLicenseClass } from "../Enums";
import { useFetchLicensesClassesQuery } from "../../shared/store/ApplicationApiSlice";
import ErrorHandler from "../../../../components/ui/ErrorHandler";

const NewLocalDrivingApplicationForm = () => {
  //
  //
  //

  /* ────────────── Redux Api  ────────────── */
  const { handleAddNewLocalDrivingLicense, isLoading, error } =
    useAddNewLocalDrivingLicense();

  const { data: response } = useFetchLicensesClassesQuery("");

  /* ────────────── Redux Store  ────────────── */
  const selectedPersonId = useAppSelector(
    (state) => state.peopleSlice.PersonId
  );

  /* ────────────── STATE & REF  ────────────── */
  const [currentStep, setCurrentStep] = useState(0);

  const selectLicenseClassRef = useRef<HTMLSelectElement>(null!);

  /* ────────────── HANDLERS  ────────────── */

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  async function HandleAddNewLocalDrivingApplication() {
    const selectedLicenseClass = selectLicenseClassRef.current
      ? (parseInt(selectLicenseClassRef.current.value) as EnumLicenseClass)
      : null;
    if (selectedPersonId === null || selectedLicenseClass === null) return;

    const localDrivingLicenseData = {
      applicantPersonId: selectedPersonId,
      applicationTypeId: EnumApplicationType.NewLocalDrivingLicenseService,
      createdByUserId: 439,
      licenseClassId: selectedLicenseClass,
    };

    await handleAddNewLocalDrivingLicense(localDrivingLicenseData);
  }

  /* ────────────── RENDER  ────────────── */
  const renderLicenseClassesOptions = response?.data.map((l) => {
    return <option value={l.licenseClassId}>{l.className}</option>;
  });

  return (
    <Box className="flex flex-col h-[100%]">
      <ErrorHandler error={error} />
      <Box className="my-4">
        <Stepper
          activeStep={currentStep}
          styleConfig={{
            activeBgColor: "#1d2a3a", // Active step background color
            completedBgColor: "#818b97", // Completed step background color
            inactiveBgColor: "#818b97", // Inactive step background color
            activeTextColor: "#ffffff", // Text color for active steps
            completedTextColor: "#ffffff", // Text color for completed steps
            inactiveTextColor: "#ffffff", // Text color for inactive steps
            size: "4em", // Size of the step circle
            circleFontSize: "1em", // Font size inside the step circle
            labelFontSize: "1em", // Font size for the label text
            borderRadius: "50%", // Border radius for the step circle
            fontWeight: "bold", // Font weight for step labels
          }}
          connectorStyleConfig={{
            activeColor: "#1d2a3a", // Active connector color
            completedColor: "#1d2a3a", // Completed connector color
            disabledColor: "#e5e7eb", // Disabled connector color
            size: 4, // Thickness of the connector line
            style: "solid", // Style of the connector line
          }}
        >
          <Step label="Person Information" />
          <Step label="Local Driving Application Information" />
        </Stepper>
      </Box>

      <Box className={`${currentStep === 1 ? "hidden" : ""}`}>
        <LookupPersonToDisplayInfo />
      </Box>

      <Box
        className={`${
          currentStep === 0 ? "hidden" : "flex-grow   "
        } flex flex-col justify-center  gap-4 font-semibold text-[22px] bg-gray-50 p-4 border border-gray-200 rounded shadow`}
      >
        <Box className="flex items-center mb-4">
          <p className="font-semibold text-gray-700 mr-2 w-1/3">
            Local Application ID:
          </p>
          <p className="text-gray-600">???</p>
        </Box>
        <Box className="flex items-center mb-4">
          <p className="font-semibold text-gray-700 mr-2  w-1/3">
            Application Date:
          </p>
          <p className="text-gray-600">2020-20-01</p>
        </Box>
        <Box className="flex items-center mb-4">
          <p className="font-semibold text-gray-700 mr-2  w-1/3">
            License Class:
          </p>
          <div>
            <SelectMenu
              ref={selectLicenseClassRef}
              className="w-[300px] border border-gray-300 rounded px-3 py-1 text-gray-700"
            >
              {renderLicenseClassesOptions}
            </SelectMenu>
          </div>
        </Box>
        <Box className="flex items-center mb-4 ">
          <p className="font-semibold text-gray-700 mr-2  w-1/3">
            Application Fees:
          </p>
          <p className="text-gray-600">$21</p>
        </Box>
        <Box className="flex items-center">
          <p className="font-semibold text-gray-700 mr-2  w-1/3">
            Created By User:
          </p>
          <p className="text-gray-600">Hamour-Moath</p>
        </Box>
      </Box>

      <Box className="flex gap-5 mt-8 justify-end">
        <Button
          disabled={currentStep === 0}
          onClick={handleBack}
          className={`bg-[#1F2937]  w-36 p-2 text-white rounded-md ${
            currentStep === 0 ? "cursor-not-allowed" : ""
          }`}
        >
          Back
        </Button>
        {currentStep === 0 ? (
          <Button
            disabled={selectedPersonId === null}
            onClick={handleNext}
            className={`bg-[#1F2937]  w-36 p-2 text-white rounded-md *:
              ${selectedPersonId === null ? "cursor-not-allowed" : ""}
              `}
          >
            Next
          </Button>
        ) : (
          <Button
            isLoading={isLoading}
            onClick={HandleAddNewLocalDrivingApplication}
            className={`bg-[#1F2937]  w-36 p-2 text-white rounded-md`}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NewLocalDrivingApplicationForm;
