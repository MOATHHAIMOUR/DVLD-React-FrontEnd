import Box from "../../../../components/ui/Box";
import Input from "../../../../components/ui/Input";
import { useRef } from "react";
import { useLazyFindLicenseHandler } from "../../LocalDrivingApplication/hooks/useLazyFindLicenseHandler";
import Button from "../../../../components/ui/Button";
import LicenseView from "../../LocalDrivingApplication/Components/LicenseView";
import { useReleaseLicenseHandler } from "../hooks/useReleaseLicenseHandler";
import ErrorMsg from "../../../../components/ui/ErrorMsg";
import { useFetchApplicationTypesQuery } from "../../shared/store/ApplicationApiSlice";
import { EnumApplicationType } from "../../LocalDrivingApplication/Enums";

const DetainLocalDrivingLicense = () => {
  /* ────────────── State  ────────────── */
  const { onFindLicenseHandler, License, isLoading, isFetching } =
    useLazyFindLicenseHandler();

  const isLicenseDetain = License?.data.isDetain ?? null;
  const licenseIdRef = useRef<HTMLInputElement>(null!);

  /* ────────────── Custom Hooks  ────────────── */

  const { handleReleaseLicense, isLoading: isReleaseLoading } =
    useReleaseLicenseHandler();

  const { data: applicationTypes } = useFetchApplicationTypesQuery(null);

  const ReleaseApplicationTypeInfo = applicationTypes?.data.find(
    (r) =>
      r.applicationTypeId === EnumApplicationType.ReleaseDetainedDrivingLicense
  );
  /* ────────────── Handlers  ────────────── */
  async function onFindLicense() {
    if (licenseIdRef.current?.value)
      await onFindLicenseHandler("LicensesId", licenseIdRef.current?.value);
  }

  async function onReleaseLicense() {
    if (!License?.data?.licenseId) {
      console.error("No License ID found.");
      return;
    }

    const licenseData = {
      licenseId: License.data.licenseId,
      releasedDate: new Date().toISOString(),
      releasedByUserId: 10, // Replace with the actual user ID
    };

    try {
      await handleReleaseLicense(licenseData);
      console.log("License successfully renewed.");
    } catch (error) {
      console.error("Failed to renew the license:", error);
    }
  }

  return (
    <Box className="flex flex-col gap-8">
      {isLicenseDetain !== null && !isLicenseDetain && (
        <ErrorMsg message="Can't release licenses, current one is not detain" />
      )}
      <Box className="w-fit flex items-center gap-8">
        <label
          htmlFor="licenseId"
          className="font-semibold text-[20px] text-nowrap"
        >
          License ID:
        </label>
        <Input ref={licenseIdRef} id="licenseId" type="text" />
        <Button
          isLoading={isLoading || isFetching}
          onClick={onFindLicense}
          className="bg-primary hover:bg-primaryHover font-semibold p-1 rounded-md shadow-xl text-white w-60"
        >
          find
        </Button>
      </Box>

      <LicenseView licenseData={License?.data} />

      <Box className="p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Application Release Info</h2>

        <Box className="grid grid-cols-1 gap-4">
          <Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Application Date:</span>
              <span>{new Date().toDateString()}</span>
            </Box>

            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Fine Fees:</span>
              <span>${License?.data.fineFees}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Application Fees:</span>
              <span>${ReleaseApplicationTypeInfo?.applicationFees}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Total Fees:</span>
              <span>
                $
                {(ReleaseApplicationTypeInfo?.applicationFees ?? 0) +
                  (License?.data.fineFees ?? 0)}
              </span>
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
            disabled={!isLicenseDetain}
            className="bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-green-600"
            onClick={onReleaseLicense}
            isLoading={isReleaseLoading}
          >
            Release
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetainLocalDrivingLicense;
