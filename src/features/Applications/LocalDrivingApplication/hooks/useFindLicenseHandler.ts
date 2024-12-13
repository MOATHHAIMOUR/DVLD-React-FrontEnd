import { toast } from "react-toastify";
import { useFetchLicenseDetailsViewQuery } from "../Store/LocalDrivingLicenseApplicationApiSlice";
import { IQuery } from "../../../../interfaces";
import { BuildQuery } from "../../../../utils";
import { skipToken } from "@reduxjs/toolkit/query";

export const useFindLicenseHandler = (query: IQuery | null) => {
  const {
    isFetching,
    isLoading,
    data: license,
    isError,
  } = useFetchLicenseDetailsViewQuery(query ? BuildQuery(query) : skipToken);

  if (isError) {
    toast.error("License is not found");
  }

  return {
    license,
    isFetching,
    isLoading,
  };
};
