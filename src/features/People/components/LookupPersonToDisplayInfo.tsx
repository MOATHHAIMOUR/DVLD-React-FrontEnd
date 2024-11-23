import FindPerson from "./FindPerson";
import PersonDetail from "./PersonDetail";
import { IQuery } from "../../../interfaces";
import { useFetchPersonHandler } from "../hooks/useFindPersonHandler";

const LookupPersonToDisplayInfo = () => {
  const { person, isFetching, isLoading, onFindPersonHandler } =
    useFetchPersonHandler();

  const onFindPerson = (query: IQuery) => {
    onFindPersonHandler(query);
  };

  return (
    <div className="flex flex-col gap-8">
      <FindPerson
        isLoading={isFetching || isLoading}
        onFindPerson={onFindPerson}
      />
      <PersonDetail personDetail={person?.data} />
    </div>
  );
};

export default LookupPersonToDisplayInfo;
