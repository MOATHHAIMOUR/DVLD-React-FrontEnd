import Logo from "../../components/ui/Logo";
import LookupUserToEdit from "../../features/User/components/LookupUserToEdit";

const EditUserPage = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col gap-10 shadow h-[100%]">
      <Logo
        direction="ROW"
        imageSize=""
        title="Edit User"
        image="/src/assets/images/edit.png"
      />
      <LookupUserToEdit />
    </div>
  );
};

export default EditUserPage;
