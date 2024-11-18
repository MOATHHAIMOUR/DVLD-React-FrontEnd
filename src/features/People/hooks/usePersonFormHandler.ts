import { toast } from "react-toastify";
import { IPerson } from "../interfaces";
import { enumFormMode } from "../../../data";
import {
  useAddPersonMutation,
  useUpdatePersonMutation,
} from "../store/PeopleApiSlice";
import { IGenericApiResponse } from "../../../interfaces/IApiResponse";

export const usePersonFormHandler = () => {
  const [addPerson] = useAddPersonMutation();
  const [updatePerson] = useUpdatePersonMutation();

  const handlePersonFormSubmit = async (
    mode: enumFormMode,
    person: IPerson
  ) => {
    let response: IGenericApiResponse<IPerson> = null!;
    try {
      if (mode === enumFormMode.Add) {
        response = await addPerson(person).unwrap();
        toast.success(response.message, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else {
        response = await updatePerson(person).unwrap();
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

  return { handlePersonFormSubmit };
};
