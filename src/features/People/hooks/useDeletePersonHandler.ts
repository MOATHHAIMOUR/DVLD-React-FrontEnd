import { useDeletePersonMutation } from "../store/PeopleApiSlice"; // Import the RTK Query mutation
import { toast } from "react-toastify";

export const useDeletePersonHandler = () => {
  const [deletePerson, { isLoading }] = useDeletePersonMutation();

  const handleDelete = async (personId: number): Promise<void> => {
    try {
      await deletePerson(personId).unwrap(); // Perform delete operation and unwrap RTK Query response
      toast.success("Person deleted successfully!", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch {
      toast.error("Failed to delete person. Please try again. ");
    }
  };

  return { handleDelete, isLoading };
};
