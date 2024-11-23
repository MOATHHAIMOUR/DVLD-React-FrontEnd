import { IQuery } from "../../../interfaces";
import Button from "../../../components/ui/Button";
import { useFindUserHandler } from "../hooks/useFindUserHandler";
import { useDeletePersonHandler } from "../hooks/useDeleteUserHandler";
import FindUser from "./FindUser";
import UserDetail from "./UserDetail";

const LookupUserToDelete = () => {
  /* ────────────── STATE  ────────────── */

  const {
    user,
    isFetching: isFetchingFindPerson,
    isLoading: isLoadingFindPerson,
    onFindUserHandler,
  } = useFindUserHandler();

  const { handleDelete, isLoading: isLoadingDeletePerson } =
    useDeletePersonHandler();

  /* ────────────── RENDER  ────────────── */

  function onFindPerson(query: IQuery) {
    onFindUserHandler(query);
  }

  function HandleDeletePerson() {
    if (user?.data.personId) handleDelete(user?.data.userId);
  }

  return (
    <div className="flex flex-col gap-4">
      <FindUser
        isLoading={isFetchingFindPerson || isLoadingFindPerson}
        onFindPerson={onFindPerson}
      />
      <UserDetail personDetail={user?.data} />
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

export default LookupUserToDelete;
