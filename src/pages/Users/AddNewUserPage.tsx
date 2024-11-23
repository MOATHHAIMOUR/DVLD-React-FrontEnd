import Logo from "../../components/ui/Logo";
import UserForm from "../../features/User/components/UserForm";
import { enumFormMode } from "../../interfaces";

const AddNewUserPage = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col shadow h-[100%]">
      <Logo
        direction="ROW"
        title="Add New User"
        image="/src/assets/images/addUser.png"
      />
      <UserForm mode={enumFormMode.Add} />
    </div>
  );
};

export default AddNewUserPage;
