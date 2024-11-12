import Button from "../../../components/ui/Button";
import { useAppSelector } from "../../../store";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"; // Importing icons
import { useDeletePersonMutation } from "../store/PeopleApiSlice";
import { toast } from "react-toastify";

interface IProps {
  CloseModal: () => void;
}
const ConfirmDeletePerson = ({ CloseModal }: IProps) => {
  const selectedPerson = useAppSelector((state) => state.PeopleSlice);
  const [deletePerson, { isLoading }] = useDeletePersonMutation();

  async function HandleConfirmDeletePerson() {
    try {
      await deletePerson(selectedPerson.id!).unwrap(); // Unwrap to handle errors from RTK Query
      toast.success("Person deleted successfully!", {
        autoClose: 3000, // Duration of 3 seconds
        hideProgressBar: true, // Hides the loading/progress bar
      });
    } catch (error) {
      toast.error(error + "Failed to delete person. Please try again.");
    } finally {
      CloseModal();
    }
  }

  return (
    <>
      <p className="mb-6 text-gray-700 text-left">
        Are you sure you want to permanently delete the following person?
      </p>

      {/* Displaying selected person details */}
      <div className="mb-6 text-left bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-medium text-gray-800">
          Name: <span className="text-gray-600">{selectedPerson.name}</span>
        </p>
        <p className="text-lg font-medium text-gray-800">
          ID: <span className="text-gray-600">{selectedPerson.id}</span>
        </p>
        <p className="text-lg font-medium text-gray-800">
          National No:{" "}
          <span className="text-gray-600">{selectedPerson.NationalNo}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          isLoading={isLoading}
          className="px-4 py-2 flex items-center bg-gray-300 text-black rounded-lg hover:bg-gray-400"
        >
          <AiOutlineClose className="mr-2" />
          Cancel
        </Button>
        <Button
          onClick={HandleConfirmDeletePerson}
          className="px-4 py-2 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <AiOutlineCheck className="mr-2" />
          Confirm
        </Button>
      </div>
    </>
  );
};

export default ConfirmDeletePerson;