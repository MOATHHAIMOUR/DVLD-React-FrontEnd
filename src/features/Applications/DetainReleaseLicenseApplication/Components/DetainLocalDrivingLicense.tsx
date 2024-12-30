import Box from "../../../../components/ui/Box";
import Input from "../../../../components/ui/Input";
import { useRef } from "react";
import { useLazyFindLicenseHandler } from "../../LocalDrivingApplication/hooks/useLazyFindLicenseHandler";
import Button from "../../../../components/ui/Button";
import LicenseView from "../../LocalDrivingApplication/Components/LicenseView";
import { useDetainLicenseHandler } from "../hooks/useDetainLicenseHandler";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import ErrorMsg from "../../../../components/ui/ErrorMsg";

const DetainLocalDrivingLicense = () => {
  /* ────────────── State  ────────────── */
  const {
    onFindLicenseHandler,
    License,
    isLoading,
    isFetching,
    error: FindLicenseError,
  } = useLazyFindLicenseHandler();
  const licenseIdRef = useRef<HTMLInputElement>(null!);

  /* ────────────── Custom Hooks  ────────────── */
  const {
    handleDetainLicense,
    isLoading: isDetainLoading,
    error: DetainError,
  } = useDetainLicenseHandler();

  const isLicenseDetain = License?.data.isDetain ?? null;

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
      createdByUserId: 10, // Replace with the actual user ID
    };

    handleDetainLicense(licenseData);
  }

  return (
    <Box className="flex flex-col gap-8">
      {isLicenseDetain !== null && isLicenseDetain && (
        <ErrorMsg message="Can't detain licenses, current one is already detain" />
      )}
      <ErrorHandler error={DetainError || FindLicenseError} />
      <Box className="w-fit flex items-center gap-8">
        <label
          htmlFor="licenseId"
          className="font-semibold text-nowrap text-[20px]"
        >
          License ID:
        </label>
        <Input ref={licenseIdRef} id="licenseId" type="text" />
        <Button
          isLoading={isLoading || isFetching}
          onClick={onFindLicense}
          className="bg-primary hover:bg-primaryHover font-semibold p-1 rounded-md shadow-xl text-white w-60"
        >
          Find
        </Button>
      </Box>

      <LicenseView licenseData={License?.data} />

      <Box className="p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Detain Info</h2>

        <Box className="grid grid-cols-2 gap-4">
          <Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Detain Date:</span>
              <span>{new Date().getDate()}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Fine Fees:</span>
              <Input />
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">License Id:</span>
              <span>{licenseIdRef?.current?.value}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Created By User id:</span>
              <span>{10}</span>
            </Box>
            <Box className="flex items-center">
              <span className="font-semibold w-48">Notes:</span>
              <textarea className="border border-gray-300 rounded w-full p-2"></textarea>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Buttons */}
      <Box className="flex justify-between mt-4">
        <Box className="flex items-center gap-4">
          <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
            Show Licenses History
          </Button>
          <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
            Show Licenses Info
          </Button>
        </Box>

        <Box className="flex space-x-4">
          <Button
            disabled={isLicenseDetain != null && isLicenseDetain}
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
