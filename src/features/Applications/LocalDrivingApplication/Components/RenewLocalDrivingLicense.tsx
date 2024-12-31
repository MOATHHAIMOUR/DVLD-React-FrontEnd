import { useRef } from "react";
import Box from "../../../../components/ui/Box";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { useLazyFindLicenseHandler } from "../hooks/useLazyFindLicenseHandler";
import LicenseView from "./LicenseView";
import { useRenewLocalDrivingLicenseHandler } from "../hooks/useRenewLocalDrivingLicenseHandler";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import {
  useFetchApplicationTypesQuery,
  useFetchLicensesClassesQuery,
} from "../../shared/store/ApplicationApiSlice";
import { EnumApplicationType } from "../Enums";

const RenewLocalDrivingLicense = () => {
  /* ────────────── State  ────────────── */
  const {
    onFindLicenseHandler,
    License,
    isLoading: FindLoading,
    isFetching,
  } = useLazyFindLicenseHandler();
  const licenseIdRef = useRef<HTMLInputElement>(null!);

  /* ────────────── Handlers  ────────────── */
  async function onFindLicense() {
    if (licenseIdRef.current?.value)
      await onFindLicenseHandler("LicensesId", licenseIdRef.current?.value);
  }

  const {
    renewLicense,
    isLoading: RenewLoading,
    error: RenewError,
    response: RenewResult,
  } = useRenewLocalDrivingLicenseHandler();

  const handleRenew = () => {
    if (License?.data)
      renewLicense({
        LicenseId: License?.data.licenseId.toString(),
        CreatedByUserId: 10,
      });
  };

  const { data: applicationTypes } = useFetchApplicationTypesQuery(null);

  const RenewApplicationTypeInfo = applicationTypes?.data.find(
    (r) =>
      r.applicationTypeId === EnumApplicationType.RenewDrivingLicenseService
  );

  const { data: licensesClasses } = useFetchLicensesClassesQuery("");
  const licenseClass = licensesClasses?.data.find(
    (x) => x.licenseClassId === License?.data.licenseClassId
  );
  return (
    <Box className="flex flex-col gap-8">
      <ErrorHandler error={RenewError} />
      <Box className="flex items-center w-fit  gap-8">
        <label
          htmlFor="licenseId"
          className="font-semibold text-[20px] text-nowrap items-center "
        >
          License ID:
        </label>
        <Input ref={licenseIdRef} id="licenseId" type="text" />
        <Button
          isLoading={FindLoading || isFetching}
          onClick={onFindLicense}
          className="bg-[#1F2937] px-6 font-semibold p-1 rounded-md shadow-xl text-white w-24"
        >
          find
        </Button>
      </Box>

      <LicenseView licenseData={License?.data} />

      <Box className="p-4 border rounded-lg shadow-md bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Application New License Info</h2>

        <Box className="grid grid-cols-2 gap-4">
          <Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">R.L Application ID:</span>
              <span>{RenewResult.applicationId || "[???]"}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Application Date:</span>
              <span>{new Date().toDateString()}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Issue Date:</span>
              <span>{new Date().toDateString()}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Application Fees:</span>
              <span>
                {RenewApplicationTypeInfo?.applicationFees || "[???]"}
              </span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">License Fees:</span>
              <span>{licenseClass?.classFees}</span>
            </Box>
            <Box className="flex items-center">
              <span className="font-semibold w-48">Notes:</span>
              <textarea className="border border-gray-300 rounded w-full p-2"></textarea>
            </Box>
          </Box>

          <Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Renewed License ID:</span>
              <span>{RenewResult.renewLicenseId || "[???]"}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Old License ID:</span>
              <span>{License?.data.licenseId || "[???]"}</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Expiration Date:</span>
              <span>
                {(licenseClass?.defaultValidityLength &&
                  new Date(
                    new Date().setFullYear(
                      new Date().getFullYear() +
                        licenseClass?.defaultValidityLength
                    )
                  ).toDateString()) ||
                  "[???]"}
              </span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Created By:</span>
              <span>Msqaer77</span>
            </Box>
            <Box className="flex items-center mb-2">
              <span className="font-semibold w-48">Total Fees:</span>
              <span>
                {(licenseClass?.classFees ?? 0) +
                  (RenewApplicationTypeInfo?.applicationFees ?? 0) || "[???]"}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer Buttons */}
      <Box className="flex gap-3 mt-4">
        <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
          Show Licenses History
        </Button>
        <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300">
          Show Licenses Info
        </Button>
        <Box className="flex flex-grow-[1]  space-x-4">
          <Button
            onClick={handleRenew}
            isLoading={RenewLoading}
            disabled={RenewLoading}
            className="ml-auto bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Renew
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RenewLocalDrivingLicense;
