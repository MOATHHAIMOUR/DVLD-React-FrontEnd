import Box from "../../../../components/ui/Box";
import { IQuery } from "../../../../interfaces";
import { useLazyFindLicenseHandler } from "../hooks/useLazyFindLicenseHandler";
import FindLicense from "./FindLicense";
import LicenseView from "./LicenseView";

const LookupLocalDrivingLicenseView = () => {
  const { onFindLicenseHandler, License, isFetching, isLoading } =
    useLazyFindLicenseHandler();

  const onFindLicense = (query: IQuery) => {
    if (query.Filter)
      onFindLicenseHandler(query.Filter?.FilterBy, query.Filter?.FilterValue);
  };

  return (
    <Box className="flex h-[100%] flex-col gap-8 p-6 rounded-lg shadow-2xl">
      <FindLicense
        isLoading={isLoading || isFetching}
        onFindLocalDrivingLicense={onFindLicense}
      />

      <LicenseView applicationId={null} licenseData={License?.data} />
    </Box>
  );
};

export default LookupLocalDrivingLicenseView;
