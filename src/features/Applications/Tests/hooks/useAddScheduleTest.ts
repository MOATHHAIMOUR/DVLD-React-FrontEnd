import { toast } from "react-toastify";
import { useAddScheduleTestMutation } from "../Store/TestApiSlice";
import { IAddScheduleTest } from "../interfaces";

export const useScheduleTest = () => {
  const [scheduleTest, { isLoading, error }] = useAddScheduleTestMutation();

  const handleScheduleTest = async (data: IAddScheduleTest) => {
    try {
      await scheduleTest(data).unwrap();
      toast.success("Test scheduled successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Failed to schedule test:", error);
    }
  };

  return {
    handleScheduleTest,
    isLoading,
    error,
  };
};
