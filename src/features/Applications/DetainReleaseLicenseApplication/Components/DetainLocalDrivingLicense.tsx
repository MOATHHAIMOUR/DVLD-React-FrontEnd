import Box from "../../../../components/ui/Box";
import Input from "../../../../components/ui/Input";
import { useRef } from "react";
import { useLazyFindLicenseHandler } from "../../LocalDrivingApplication/hooks/useLazyFindLicenseHandler";
import Button from "../../../../components/ui/Button";
import LicenseView from "../../LocalDrivingApplication/Components/LicenseView";
import { useDetainLicenseHandler } from "../hooks/useDetainLicenseHandler";

const DetainLocalDrivingLicense = () => {
  /* ────────────── State  ────────────── */
  const { onFindLicenseHandler, License, isLoading, isFetching } =
    useLazyFindLicenseHandler();
  const licenseIdRef = useRef<HTMLInputElement>(null!);

  /* ────────────── Custom Hooks  ────────────── */
  const { handleDetainLicense, isLoading: isDetainLoading } =
    useDetainLicenseHandler();

  /* ────────────── Handlers  ────────────── */
  async function onFindLicense() {
    if (licenseIdRef.current?.value)
      await onFindLicenseHandler("LicensesId", licenseIdRef.current?.value);
  }

  async function onDetainLicense() {
    if (!License?.data?.licenseId) {
      console.error("No License ID found.");
      return;
    }

    const licenseData = {
      licenseId: License.data.licenseId,
      detainDate: new Date().toISOString(),
      fineFees: 50, // Example fine fee; replace as needed
      createdByUserId: 1, // Replace with the actual user ID
    };

    try {
      await handleDetainLicense(licenseData);
      console.log("License successfully detained.");
    } catch (error) {
      console.error("Failed to detain the license:", error);
    }
  }

  return (
    <Box className="flex flex-col gap-8">
      <Box className="flex items-center space-x-2">
        <label htmlFor="licenseId" className="font-semibold text-[20px]">
          License ID:
        </label>
        <Input
          ref={licenseIdRef}
          className="w-[200px]"
          id="licenseId"
          type="text"
        />
        <Button
          isLoading={isLoading || isFetching}
          onClick={onFindLicense}
          className="bg-[#1F2937] font-semibold p-1 rounded-md shadow-xl text-white w-24"
        >
          Find
        </Button>
      </Box>

      <LicenseView licenseData={License?.data} applicationId={null} />

      <Box className="p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Application New License Info</h2>

        <Box className="grid grid-cols-2 gap-4">
          <Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">R.L Application ID:</span>
              <span>[???]</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Application Date:</span>
              <span>10/Oct/2023</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Issue Date:</span>
              <span>10/Oct/2023</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Application Fees:</span>
              <span>7</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">License Fees:</span>
              <span>[$$$]</span>
            </Box>
            <Box className="flex items-center">
              <span className="font-semibold w-48">Notes:</span>
              <textarea className="border border-gray-300 rounded w-full p-2"></textarea>
            </Box>
          </Box>

          <Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Renewed License ID:</span>
              <span>[???]</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Old License ID:</span>
              <span>[???]</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Expiration Date:</span>
              <span>???</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Created By:</span>
              <span>Msqaer77</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Total Fees:</span>
              <span>[$$$]</span>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Buttons */}
      <Box className="flex justify-between mt-4">
        <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
          Show Licenses History
        </Button>
        <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
          Show Licenses Info
        </Button>
        <Box className="flex space-x-4">
          <Button
            className="bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-red-600"
            onClick={onDetainLicense}
            isLoading={isDetainLoading}
          >
            Detain
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetainLocalDrivingLicense;
