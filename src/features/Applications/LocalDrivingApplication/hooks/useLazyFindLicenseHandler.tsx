import { toast } from "react-toastify";
import { useLazyFetchLicenseDetailsViewQuery } from "../Store/LocalDrivingLicenseApplicationApiSlice";
import { BuildSimpleQuery } from "../../../../utils";

export const useLazyFindLicenseHandler = () => {
  const [triggerFetchPerson, { isFetching, isLoading, data: License, error }] =
    useLazyFetchLicenseDetailsViewQuery();

  const onFindLicenseHandler = async (key: string, value: string) => {
    try {
      const result = await triggerFetchPerson(
        BuildSimpleQuery(key, value)
      ).unwrap();
      if (result) {
        toast.success("License is fetched successfully", {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch {
      toast.error("License not found", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return {
    onFindLicenseHandler,
    License,
    isFetching,
    isLoading,
    error,
  };
};
