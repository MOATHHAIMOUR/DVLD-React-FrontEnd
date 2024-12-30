import { useParams } from "react-router-dom";
import Box from "../../../../components/ui/Box";
import { IQuery } from "../../../../interfaces";
import { useLazyFindLicenseHandler } from "../hooks/useLazyFindLicenseHandler";
import FindLicense from "./FindLicense";
import LicenseView from "./LicenseView";
import { useFetchLicenseDetailsViewQuery } from "../Store/LocalDrivingLicenseApplicationApiSlice";
import { BuildSimpleQuery } from "../../../../utils";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";

const LookupLocalDrivingLicenseView = () => {
  const { localDrivingId } = useParams();

  const {
    onFindLicenseHandler,
    isFetching: LazyFetching,
    isLoading: LazyLoading,
    License: LicenseLazy,
  } = useLazyFindLicenseHandler();

  const { data: LicenseData, isLoading } = useFetchLicenseDetailsViewQuery(
    BuildSimpleQuery("localDrivingApplicationId", localDrivingId!),
    { skip: localDrivingId === undefined }
  );

  const onFindLicense = (query: IQuery) => {
    if (query.Filter)
      onFindLicenseHandler(query.Filter?.FilterBy, query.Filter?.FilterValue);
  };

  const License = LicenseLazy || LicenseData;

  return (
    <Box className="flex h-[100%] flex-col gap-8 p-6 rounded-lg shadow-2xl">
      <Box disabled={localDrivingId !== undefined}>
        {
          <FindLicense
            isLoading={LazyLoading || LazyFetching}
            onFindLocalDrivingLicense={onFindLicense}
          />
        }
      </Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <LicenseView licenseData={License?.data} />
      )}
    </Box>
  );
};

export default LookupLocalDrivingLicenseView;
