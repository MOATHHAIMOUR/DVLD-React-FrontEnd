import Button from "../../../components/ui/Button";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"; // Importing icons
import { IPersonDetailView } from "../interfaces";
import { useDeletePersonHandler } from "../hooks/useDeletePersonHandler";

interface IProps {
  CloseModal: () => void;
  person: IPersonDetailView;
}
const ConfirmDeletePerson = ({ CloseModal, person }: IProps) => {
  const { handleDelete, isLoading } = useDeletePersonHandler();

  async function HandleConfirmDeletePerson() {
    await handleDelete(person.personId!);
    CloseModal();
  }

  console.log("personId: " + person.personId);

  return (
    <>
      <p className="mb-6 text-gray-700 text-left">
        Are you sure you want to permanently delete the following person?
      </p>

      {/* Displaying selected person details */}
      <div className="mb-6 flex flex-col gap-3 text-left bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-medium text-gray-800">
          ID: <span className="text-gray-600 ">{person.personId}</span>
        </p>
        <p className="text-lg font-medium text-gray-800">
          Name:{" "}
          <span className="text-gray-600 ">
            {" "}
            {person.firstName + person.lastName}
          </span>
        </p>
        <p className="text-lg font-medium text-gray-800">
          National No:{" "}
          <span className="text-gray-600 ">{person.nationalNo}</span>
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
