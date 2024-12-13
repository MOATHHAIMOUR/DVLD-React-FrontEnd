import { useEffect } from "react";
import { toast } from "react-toastify";
import { useFetchTestLocalDrivingApplicationAppointmentViewQuery } from "../Store/TestApiSlice";

const useDrivingApplicationData = (id: string) => {
  // Fetch data using your query hook
  const { data, error, isLoading, isError } =
    useFetchTestLocalDrivingApplicationAppointmentViewQuery(id);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch data. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isError]);

  return { data, error, isLoading };
};

export default useDrivingApplicationData;
