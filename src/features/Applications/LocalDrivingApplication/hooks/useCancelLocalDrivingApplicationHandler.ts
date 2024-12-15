import { useCancelLocalDrivingApplicationMutation } from "../Store/LocalDrivingLicenseApplicationApiSlice";

export function useCancelLocalDrivingApplicationHandler() {
  const [handleCancel, { isLoading, error }] =
    useCancelLocalDrivingApplicationMutation();

  async function HandleConfirmCancelLocalDrivingApplication(
    localDrivingApplication: number,
    CloseModal: () => void
  ) {
    try {
      await handleCancel(localDrivingApplication).unwrap();
      CloseModal(); // Call the modal close function on success
    } catch {
      //console.error("Error cancelling application:", err);
    }
  }

  return {
    HandleConfirmCancelLocalDrivingApplication,
    isLoading,
    error,
  };
}
