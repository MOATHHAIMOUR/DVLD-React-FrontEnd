import Logo from "../../components/ui/Logo";
import LookupUserToDelete from "../../features/User/components/LookupUserToDelete";

const DeleteUserPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Logo
        image="/src/assets/images/deletePerson.png"
        direction="ROW"
        title="Delete Person"
      />
      <LookupUserToDelete />
    </div>
  );
};

export default DeleteUserPage;
