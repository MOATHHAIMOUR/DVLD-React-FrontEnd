import { toast } from "react-toastify";
import { IAddTestResult } from "../interfaces";
import { useAddTestResultMutation } from "../Store/TestApiSlice";

export const useTestResultHandler = () => {
  const [triggerAddTestResult, { isLoading, error, isError, data: result }] =
    useAddTestResultMutation();

  const onSaveTestResultHandler = async (data: IAddTestResult) => {
    try {
      await triggerAddTestResult(data).unwrap();
      toast.success("Test result saved successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch {
      //
    }
  };

  return {
    onSaveTestResultHandler,
    isLoading,
    isError,
    result,

    error,
  };
};
