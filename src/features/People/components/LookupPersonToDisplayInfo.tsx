import FindPerson from "./FindPerson";
import PersonDetail from "./PersonDetail";
import { IQuery } from "../../../interfaces";
import { useFetchPersonHandler } from "../hooks/useFindPersonHandler";
import Box from "../../../components/ui/Box";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store";
import { setSelectedPerson } from "../store/PeopleSlice";

const LookupPersonToDisplayInfo = () => {
  const { person, isFetching, isLoading, onFindPersonHandler, error } =
    useFetchPersonHandler();

  const dispatch = useAppDispatch();
  const onFindPerson = (query: IQuery) => {
    onFindPersonHandler(query);
  };

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
    <Box className="flex flex-col gap-8">
      <ErrorHandler error={error} />
      <FindPerson
        isLoading={isFetching || isLoading}
        onFindPerson={onFindPerson}
      />
      <PersonDetail personDetail={person?.data} />
    </Box>
  );
};

export default LookupPersonToDisplayInfo;
