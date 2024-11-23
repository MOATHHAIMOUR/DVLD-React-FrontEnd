import Box from "../../../components/ui/Box";
import FindPerson from "./FindPerson";
import PersonForm from "./PersonForm";
import PersonFormLoadingSkeleton from "./PersonFormLoadingSkeleton";
import Button from "../../../components/ui/Button";
import { useFetchPersonHandler } from "../hooks/useFindPersonHandler";
import { enumFormMode } from "../../../interfaces";

const LookupPersonToEdit = () => {
  const {
    isFetching,
    isLoading,
    isPersonSelected,
    onFindPersonHandler,
    person,
    personId,
    setPersonId,
  } = useFetchPersonHandler();

  function HandleResetForm() {
    setPersonId(0); // Reset local state
  }

  return (
    <Box className="flex flex-col h-[100%] gap-4 ">
      <Box className="flex justify-between border b-2 rounded-md shadow-lg mb-4 p-3">
        <FindPerson
          isDisabled={isPersonSelected}
          isLoading={isFetching || isLoading}
          onFindPerson={onFindPersonHandler}
        />
        {personId > 0 && (
          <Button
            type="button"
            onClick={HandleResetForm}
            className={` w-28 p-1 bg-[#374151] hover:bg-[#3d434d] text-white rounded-md`}
          >
            Reset Form
          </Button>
        )}
      </Box>
      {isFetching || isLoading ? (
        <PersonFormLoadingSkeleton />
      ) : (
        <PersonForm
          key={personId}
          isDisabled={!isPersonSelected}
          mode={enumFormMode.Edit}
          PersonData={isPersonSelected ? person?.data : undefined}
        />
      )}
    </Box>
  );
};

export default LookupPersonToEdit;
