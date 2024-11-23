import { toast } from "react-toastify";
import { useDeleteUserMutation } from "../store/UserApiSlice";

export const useDeletePersonHandler = () => {
  const [deletePerson, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async (personId: number): Promise<void> => {
    try {
      await deletePerson(personId).unwrap(); // Perform delete operation and unwrap RTK Query response
      toast.success("user deleted successfully!", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch {
      toast.error("Failed to delete user. Please try again. ", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return { handleDelete, isLoading };
};
