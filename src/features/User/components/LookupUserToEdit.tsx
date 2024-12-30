import Box from "../../../components/ui/Box";
import Button from "../../../components/ui/Button";
import ErrorHandler from "../../../components/ui/ErrorHandler";
import { enumFormMode } from "../../../Enums";
import { useFindUserHandler } from "../hooks/useFindUserHandler";
import { IApiUser } from "../interfaces";
import FindUser from "./FindUser";
import UserForm from "./UserForm";

const LookupUserToEdit = () => {
  const {
    isFetching,
    isLoading,
    isUserSelected,
    onFindUserHandler,
    user,
    userId,
    setUserId,
    error,
  } = useFindUserHandler();

  function HandleResetForm() {
    setUserId(0); // Reset local state
  }

  return (
    <Box className="flex flex-col h-[100%] gap-4 ">
      <ErrorHandler error={error} />
      <Box className="flex justify-between border b-2 rounded-md shadow-lg mb-4 p-3">
        <FindUser
          isDisabled={isUserSelected}
          isLoading={isFetching || isLoading}
          onFindPerson={onFindUserHandler}
        />
        {userId > 0 && (
          <Button
            type="button"
            onClick={HandleResetForm}
            className={` w-28 p-1 bg-[#374151] hover:bg-[#3d434d] text-white rounded-md`}
          >
            Reset Form
          </Button>
        )}
      </Box>
      <UserForm
        key={userId}
        isDisabled={!isUserSelected}
        mode={enumFormMode.Edit}
        userData={isUserSelected ? (user?.data as IApiUser) : undefined}
      />
    </Box>
  );
};

export default LookupUserToEdit;
