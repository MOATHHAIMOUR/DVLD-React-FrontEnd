import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Button from "../../../../components/ui/Button";
import { ILocalDrivingApplication } from "../interfaces";
import ErrorHandler from "../../../../components/ui/ErrorHandler";
import { useCancelLocalDrivingApplicationHandler } from "../hooks/useCancelLocalDrivingApplicationHandler";

interface IProps {
  CloseModal: () => void;
  localDrivingApplication: ILocalDrivingApplication;
}
const ConfirmCancelLocalDrivingApplication = ({
  CloseModal,
  localDrivingApplication,
}: IProps) => {
  const { HandleConfirmCancelLocalDrivingApplication, error, isLoading } =
    useCancelLocalDrivingApplicationHandler();

  async function onConfirm() {
    await HandleConfirmCancelLocalDrivingApplication(
      localDrivingApplication.localDrivingLicenseApplicationId!,
      CloseModal
    );
  }

  return (
    <>
      <ErrorHandler error={error} />
      <p className="mb-6 text-gray-700 text-left">
        Are you sure you want to permanently Cancel this following Local Driving
        Application?
      </p>

      {/* Displaying selected person details */}
      <div className="mb-6 flex flex-col gap-3 text-left bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-medium text-gray-800">
          Local ApplicationId :{" "}
          <span className="text-gray-600 ">
            {localDrivingApplication.localDrivingLicenseApplicationId}
          </span>
        </p>
        <p className="text-lg text-nowrap font-medium text-gray-800">
          Name :{" "}
          <span className="text-gray-600 ">
            {" "}
            {localDrivingApplication.fullName}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          onClick={CloseModal}
          isLoading={isLoading}
          className="px-4 py-2 flex items-center bg-gray-300 text-black rounded-lg hover:bg-gray-400"
        >
          <AiOutlineClose className="mr-2" />
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={onConfirm}
          className="px-4 py-2 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <AiOutlineCheck className="mr-2" />
          Confirm
        </Button>
      </div>
    </>
  );
};

export default ConfirmCancelLocalDrivingApplication;
