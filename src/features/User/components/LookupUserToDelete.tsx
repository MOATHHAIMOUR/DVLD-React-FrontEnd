import { IQuery } from "../../../interfaces";
import Button from "../../../components/ui/Button";
import { useFindUserHandler } from "../hooks/useFindUserHandler";
import { useDeletePersonHandler } from "../hooks/useDeleteUserHandler";
import FindUser from "./FindUser";
import UserDetail from "./UserDetail";
import Box from "../../../components/ui/Box";
import ErrorHandler from "../../../components/ui/ErrorHandler";

const LookupUserToDelete = () => {
  /* ────────────── STATE  ────────────── */

  const {
    user,
    userId,
    isFetching: isFetchingFindPerson,
    isLoading: isLoadingFindPerson,
    onFindUserHandler,
    error,
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
    <Box className="flex flex-col gap-4">
      <ErrorHandler error={error} />
      <FindUser
        isLoading={isFetchingFindPerson || isLoadingFindPerson}
        onFindPerson={onFindPerson}
      />
      <UserDetail userDetail={user?.data} />
      <Button
        isLoading={isLoadingDeletePerson}
        disabled={isLoadingDeletePerson || userId === 0}
        className="p-2 w-40 bg-red-700 ml-auto rounded-md text-white"
        onClick={HandleDeletePerson}
      >
        Delete
      </Button>
    </Box>
  );
};

export default LookupUserToDelete;
