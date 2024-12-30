import { FaIdCard, FaCalendarAlt, FaDollarSign, FaGlobe } from "react-icons/fa";
import Box from "../../../../components/ui/Box";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import LicenseView from "../../LocalDrivingApplication/Components/LicenseView";
import { useRef, useState } from "react";
import { useLazyFindLicenseHandler } from "../../LocalDrivingApplication/hooks/useLazyFindLicenseHandler";
import { formatDate, isNumber } from "../../../../utils";
import ErrorMsg from "../../../../components/ui/ErrorMsg";
import { toast } from "react-toastify";
import { useAddNewInternationalLicenseHandler } from "../hooks/useAddNewInternationalHandler";
import { IAddNewInternationalLicense } from "../interfaces";
import {
  EnumApplicationType,
  EnumLicenseClass,
} from "../../LocalDrivingApplication/Enums";
import { useFetchApplicationTypesQuery } from "../../shared/store/ApplicationApiSlice";
import DatePickerComponent, {
  DatePickerRef,
} from "../../../../components/ui/DatePickerComponent";
import { AiOutlineCalendar } from "react-icons/ai";

const AddNewInternationalLicenseApplication = () => {
  /* ────────────── STATE  ────────────── */
  const [error, setError] = useState<string | null>(null);

  const queryRef = useRef<HTMLInputElement>(null!);

  const { onFindLicenseHandler, License, isFetching, isLoading } =
    useLazyFindLicenseHandler();

  const {
    handleAddNewInternationalLicense,
    data: response,
    isLoading: isLoadingInternationalLicense,
  } = useAddNewInternationalLicenseHandler();

  const { data: applicationTypes } = useFetchApplicationTypesQuery(null);

  const internationalApplication = applicationTypes?.data.find(
    (i) => i.applicationTypeId === EnumApplicationType.NewInternationalLicense
  );

  const datePickerRef = useRef<DatePickerRef>(null);

  /* ────────────── Derived Values  ────────────── */

  console.log("License?.data.licenseClassId: " + License?.data.licenseClassId);
  const isLicenseOrdinaryLicense =
    License?.data &&
    License?.data.licenseClassId === EnumLicenseClass.OrdinaryDrivingLicense;

  /* ────────────── Handlers  ────────────── */
  function FindLicenseHandler() {
    if (queryRef.current.value === "") {
      setError("fill license field first");
      return;
    }

    if (queryRef.current)
      onFindLicenseHandler("LicenseId", queryRef.current.value);
  }

  function ChangeQueryHandler(value: string) {
    if (!isNumber(value)) setError("Value should be a number");
    else setError(null);
  }

  async function IssueLicenseHandler() {
    if (!License) {
      toast.error("no license selected!");
      return;
    }

    if (License?.data.isDetain) {
      toast.error("license is detain can't create international license");
      return;
    }
    if (
      new Date(License.data.expirationDate).getTime() < new Date().getTime()
    ) {
      toast.error("license is expired can't create international license");
      return;
    }
    if (!License?.data.isActive) {
      toast.error("license is not active can't create international license");
      return;
    }

    const InternationalLicenseData: IAddNewInternationalLicense = {
      driverId: License.data.driverId,
      expirationDate: new Date(),
      createdByUserId: 396,
      isActive: true,
      issueDate: new Date(),
      issuedUsingLocalLicenseId: 14,
    };

    await handleAddNewInternationalLicense(InternationalLicenseData);
  }

  function onChangeDate(date: Date) {
    if (date === null) {
      setError("must enter date");
    }
  }

  return (
    <Box className="bg-white p-6 flex flex-col gap-5">
      <Box className="flex">
        <Box className="flex gap-3 items-center">
          <FaIdCard className="text-[#1F2937] text-2xl ml-3" />
          <span className="mr-2 p-1 font-semibold text-2xl">LicenseId: </span>
          <Box className="flex items-center relative">
            <Input
              ref={queryRef}
              onChange={(e) => ChangeQueryHandler(e.target.value)}
              type="text"
              className="border border-gray-300 rounded p-1 w-60"
              placeholder="Enter License ID"
            />
            {error && (
              <ErrorMsg className="absolute bottom-[-22px]" message={error} />
            )}
          </Box>

          <Button
            disabled={error !== null}
            isLoading={isLoading || isFetching}
            onClick={FindLicenseHandler}
            className={`${
              error !== null ? "cursor-not-allowed" : ""
            } w-28 p-1 bg-[#374151] hover:bg-[#3d434d] text-white rounded-md`}
          >
            Find
          </Button>
        </Box>
      </Box>

      {/* Driver License Info Section */}
      {License?.data && !isLicenseOrdinaryLicense && (
        <ErrorMsg message="current license type is not ordinary cant create international one" />
      )}
      <LicenseView licenseData={License?.data} />

      {/* Application Info Section */}
      <Box className="bg-gray-100 border rounded-lg p-4 mb-6">
        <h2 className="font-bold text-lg mb-4">Application Info</h2>
        <Box className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Box>
            <span>I.L. Application ID:</span>{" "}
            <span>{response?.data?.applicationId || "[???]"}</span>
          </Box>
          <Box>
            <span>Application Date:</span>{" "}
            <FaCalendarAlt className="inline ml-2" />{" "}
            <span>{formatDate(new Date())}</span>
          </Box>
          <Box>
            <span>Issue Date:</span> <FaCalendarAlt className="inline ml-2" />{" "}
            <span>{formatDate(new Date())}</span>
          </Box>
          <Box>
            <span>Fees:</span> <FaDollarSign className="inline ml-2" />{" "}
            <span>{internationalApplication?.applicationFees || "[???]"}</span>
          </Box>
          <Box>
            <span>I.L. License ID:</span> <FaGlobe className="inline ml-2" />{" "}
            <span>{response?.data?.internationalLicenseId || "[???]"}</span>
          </Box>
          <Box>
            <span>Local License ID:</span> <FaIdCard className="inline ml-2" />{" "}
            <span>{License?.data.licenseId || "[???]"}</span>
          </Box>
          <Box className="flex items-center space-x-2">
            <AiOutlineCalendar className="text-gray-500" />
            <span className="font-medium">Date:</span>
            <DatePickerComponent
              onChange={onChangeDate}
              ref={datePickerRef}
              className="w-full"
            />
            {error && <ErrorMsg message={error} />}
          </Box>
          <Box>
            <span>Created By:</span> <span>not Implemented</span>
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
            disabled={!isLicenseOrdinaryLicense}
            isLoading={isLoadingInternationalLicense}
            onClick={IssueLicenseHandler}
            className="bg-[#1F2937] text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Issue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewInternationalLicenseApplication;
