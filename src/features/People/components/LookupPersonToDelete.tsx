import { IQuery } from "../../../interfaces";
import FindPerson from "./FindPerson";
import PersonDetail from "./PersonDetail";
import Button from "../../../components/ui/Button";
import { useDeletePersonHandler } from "../hooks/useDeletePersonHandler";
import { useFetchPersonHandler } from "../hooks/useFindPersonHandler";

const LookupPersonToDelete = () => {
  /* ────────────── STATE  ────────────── */

  const {
    person,
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

  function HandleDeletePerson() {
    if (person?.data.personId) handleDelete(person?.data.personId);
  }

  return (
    <div className="flex flex-col gap-4">
      <FindPerson
        isLoading={isFetchingFindPerson || isLoadingFindPerson}
        onFindPerson={onFindPerson}
      />
      <PersonDetail personDetail={person?.data} />
      <Button
        disabled={isLoadingDeletePerson}
        className="p-2 w-40 bg-red-700 ml-auto rounded-md text-white"
        onClick={HandleDeletePerson}
      >
        Delete
      </Button>
    </div>
  );
};

export default LookupPersonToDelete;
