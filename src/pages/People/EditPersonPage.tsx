import Logo from "../../components/ui/Logo";
import LookupPersonToEdit from "../../features/People/components/LookupPersonToEdit";

const EditPersonPage = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col gap-10 shadow h-[100%]">
      <Logo
        direction="ROW"
        imageSize=""
        title="Edit Person"
        image="/src/assets/images/edit.png"
      />
      <LookupPersonToEdit />
    </div>
  );
};

export default EditPersonPage;
