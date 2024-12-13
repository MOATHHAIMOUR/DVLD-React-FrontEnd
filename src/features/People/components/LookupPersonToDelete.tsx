import { IQuery } from "../../../interfaces";
import FindPerson from "./FindPerson";
import PersonDetail from "./PersonDetail";
import Button from "../../../components/ui/Button";
import { useDeletePersonHandler } from "../hooks/useDeletePersonHandler";
import { useFetchPersonHandler } from "../hooks/useFindPersonHandler";
import Box from "../../../components/ui/Box";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { useEffect, useState } from "react";
import { setSelectedPerson } from "../store/PeopleSlice";
import { useAppDispatch } from "../../../store";

const LookupPersonToDelete = () => {
  /* ────────────── STATE  ────────────── */

  const [key, setKey] = useState(0); // Unique key for resetting the component
  const dispatch = useAppDispatch();

  const {
    person,
    error,
    isFetching: isFetchingFindPerson,
    isLoading: isLoadingFindPerson,
    onFindPersonHandler,
  } = useFetchPersonHandler();

  const { handleDelete, isLoading: isLoadingDeletePerson } =
    useDeletePersonHandler();

  /* ────────────── RENDER  ────────────── */

  function onFindPerson(query: IQuery) {
    onFindPersonHandler(query);
  }

  async function HandleDeletePerson() {
    if (person?.data.personId) {
      await handleDelete(person?.data.personId);
    }
    setKey((i) => i + 1);
  }

  useEffect(() => {
    return () => {
      dispatch(
        setSelectedPerson({
          IsUser: null,
          NationalNo: null,
          PersonId: null,
        })
      );
    };
  }, [dispatch]);

  return (
    <>
      <ErrorHandler error={error} />
      <Box className="flex flex-col gap-8">
        <FindPerson
          key={key}
          isLoading={isFetchingFindPerson || isLoadingFindPerson}
          onFindPerson={onFindPerson}
        />
        <PersonDetail key={key} personDetail={person?.data} />
        <Button
          isLoading={isLoadingDeletePerson}
          disabled={isLoadingDeletePerson}
          className="p-2 w-40 bg-red-700 ml-auto rounded-md text-white"
          onClick={HandleDeletePerson}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};

export default LookupPersonToDelete;
