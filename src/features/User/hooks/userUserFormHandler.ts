import { toast } from "react-toastify";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import { IApiUser } from "../interfaces";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../store/UserApiSlice";
import { enumFormMode } from "../../../Enums";

export const useUserFormHandler = () => {
  const [addUser, { isLoading: isAddingUser, error: addUserError }] =
    useAddUserMutation(); // Aliased isLoading and error
  const [updateUser, { isLoading: isUpdatingUser, error: updateUserError }] =
    useUpdateUserMutation(); // Aliased isLoading and error

  const handleUserFormSubmit = async (
    mode: enumFormMode,
    user: IApiUser
  ): Promise<void> => {
    let response: IGenericApiResponse<string>;

    if (mode === enumFormMode.Add) {
      response = await addUser(user).unwrap();
      toast.success(response.data || "User added successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      response = await updateUser(user).unwrap();
      toast.success(response.message || "User updated successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return {
    handleUserFormSubmit,
    isAddingUser,
    isUpdatingUser,
    addUserError,
    updateUserError,
  };
};
