import Box from "../../../components/ui/Box";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { IQuery } from "../../../interfaces";
import { useFindUserHandler } from "../hooks/useFindUserHandler";
import FindUser from "./FindUser";
import UserDetail from "./UserDetail";

const LookupUserToDisplayInfo = () => {
  const { user, isFetching, isLoading, onFindUserHandler, error } =
    useFindUserHandler();

  console.log("errror: " + error);
  const onFindUser = (query: IQuery) => {
    onFindUserHandler(query);
  };

  return (
    <Box className="flex flex-col gap-8">
      <ErrorHandler error={error} />
      <FindUser isLoading={isFetching || isLoading} onFindPerson={onFindUser} />
      <UserDetail userDetail={user?.data} />
    </Box>
  );
};

export default LookupUserToDisplayInfo;
