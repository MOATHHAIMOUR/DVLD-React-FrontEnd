import { IQuery } from "../../../interfaces";
import { useFindUserHandler } from "../hooks/useFindUserHandler";
import FindUser from "./FindUser";
import UserDetail from "./UserDetail";

const LookupUserToDisplayInfo = () => {
  const { user, isFetching, isLoading, onFindUserHandler } =
    useFindUserHandler();

  const onFindUser = (query: IQuery) => {
    onFindUserHandler(query);
  };

  return (
    <div className="flex flex-col gap-8">
      <FindUser isLoading={isFetching || isLoading} onFindPerson={onFindUser} />
      <UserDetail personDetail={user?.data} />
    </div>
  );
};

export default LookupUserToDisplayInfo;
