import Box from "../../../components/ui/Box";
import FindPerson from "./FindPerson";
import PersonForm from "./PersonForm";
import Button from "../../../components/ui/Button";
import { useFetchPersonHandler } from "../hooks/useFindPersonHandler";
import { enumFormMode } from "../../../Enums";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { setSelectedPerson } from "../store/PeopleSlice";

const LookupPersonToEdit = () => {
  const [key, setKey] = useState(0);
  const dispatch = useAppDispatch();

  const {
    isFetching,
    isLoading,
    isPersonSelected,
    onFindPersonHandler,
    person,
    personId,
    error,
    setPersonId,
  } = useFetchPersonHandler();

  function HandleResetForm() {
    setPersonId(0); // Reset local state
  }

  function ResetComponent() {
    setKey((i) => i + 1);
    setPersonId(0);
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

      <Box className="flex flex-col h-[100%] gap-4 ">
        <Box className="flex justify-between border b-2 rounded-md shadow-lg mb-4 p-3">
          <FindPerson
            key={key}
            isDisabled={isPersonSelected}
            isLoading={isFetching || isLoading}
            onFindPerson={onFindPersonHandler}
          />
          {personId > 0 && (
            <Button
              type="button"
              onClick={HandleResetForm}
              className={` w-28 p-1 bg-primary hover:bg-primaryHover text-white rounded-md`}
            >
              Reset Form
            </Button>
          )}
        </Box>
        <PersonForm
          key={personId}
          isDisabled={!isPersonSelected}
          mode={enumFormMode.Edit}
          PersonData={isPersonSelected ? person?.data : undefined}
          ResetComponent={ResetComponent}
        />
      </Box>
    </>
  );
};

export default LookupPersonToEdit;
