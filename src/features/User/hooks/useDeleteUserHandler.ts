import { toast } from "react-toastify";
import { useDeleteUserMutation } from "../store/UserApiSlice";

export const useDeletePersonHandler = () => {
  const [deletePerson, { isLoading, error }] = useDeleteUserMutation();

  const handleDelete = async (personId: number): Promise<void> => {
    // Unwrap the result to get the resolved response or throw an error
    try {
      await deletePerson(personId).unwrap();
      toast.success("User deleted successfully!", {
        autoClose: 3000,
        hideProgressBar: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      /* empty */
    }
  };

  return { handleDelete, isLoading, error };
};
