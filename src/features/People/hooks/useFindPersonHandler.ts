import { useState } from "react";
import { toast } from "react-toastify";
import { useLazyFetchPersonQuery } from "../store/PeopleApiSlice";
import { IQuery } from "../../../interfaces";
import { BuildSimpleQuery } from "../../../utils";
import { useAppDispatch } from "../../../store";
import { setSelectedPerson } from "../store/PeopleSlice";

export const useFetchPersonHandler = () => {
  const [triggerFetchPerson, { isFetching, isLoading, data: person, error }] =
    useLazyFetchPersonQuery();

  const [personId, setPersonId] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isPersonSelected = personId !== 0;

  const onFindPersonHandler = async (filters: IQuery) => {
    const result = await triggerFetchPerson(
      BuildSimpleQuery(
        filters.Filter?.FilterBy ?? "",
        filters.Filter?.FilterValue ?? ""
      )
    ).unwrap();

    if (result) {
      console.log("Address: " + result.data?.address);

      toast.success("person is fetched successfully", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setPersonId(result.data.personId!);
      dispatch(
        setSelectedPerson({
          PersonId: result.data.personId,
          NationalNo: result.data.nationalNo,
          IsUser: result.data.isUser,
        })
      );
    }
  };

  return {
    onFindPersonHandler,
    setPersonId,
    personId,
    person,
    isFetching,
    error,
    isLoading,
    isPersonSelected,
  };
};
