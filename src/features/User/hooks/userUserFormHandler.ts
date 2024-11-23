import { toast } from "react-toastify";
import {} from "../data";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";
import { enumFormMode } from "../../../interfaces";
import { IApiUser } from "../interfaces";
import {
  useAddUserMutation,
  useUpdateUserMutation,
} from "../store/UserApiSlice";
import { useNavigate } from "react-router-dom";

export const useUserFormHandler = () => {
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const navigate = useNavigate();
  const handleUserFormSubmit = async (mode: enumFormMode, user: IApiUser) => {
    let response: IGenericApiResponse<string> = null!;
    try {
      if (mode === enumFormMode.Add) {
        response = await addUser(user).unwrap();
        toast.success(response.data, {
          autoClose: 2000,
          hideProgressBar: true,
        });
        navigate("/");
      } else {
        console.log("heree: " + user.userId);
        response = await updateUser(user).unwrap();
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      const errorMessage = response.errors || "An error occurred";
      console.log(error);
      toast.error(errorMessage, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return { handleUserFormSubmit };
};
