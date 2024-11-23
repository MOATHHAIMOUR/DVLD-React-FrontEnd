import { useState } from "react";
import { toast } from "react-toastify";
import { useLazyFetchPersonQuery } from "../store/PeopleApiSlice";
import { IQuery } from "../../../interfaces";
import { BuildQuery } from "../../../utils";
import { useAppDispatch } from "../../../store";
import { setSelectedPerson } from "../store/PeopleSlice";

export const useFetchPersonHandler = () => {
  const [triggerFetchPerson, { isFetching, isLoading, data: person }] =
    useLazyFetchPersonQuery();
  const [personId, setPersonId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isPersonSelected = personId !== 0;

  const onFindPersonHandler = async (filters: IQuery) => {
    try {
      const result = await triggerFetchPerson(BuildQuery(filters)).unwrap();
      if (result) {
        toast.success("User is fetched successfully", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.log("result.data.personId: " + result.data.personId);
        setPersonId(result.data.personId!);
        dispatch(
          setSelectedPerson({
            PersonId: result.data.personId,
            NationalNo: result.data.nationalNo,
            IsUser: result.data.isUser,
          })
        );
      }
    } catch {
      toast.error("User not found", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return {
    onFindPersonHandler,
    setPersonId,
    personId,
    person,
    isFetching,
    isLoading,
    isPersonSelected,
  };
};
