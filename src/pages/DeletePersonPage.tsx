import Logo from "../components/ui/Logo";
import LookupPersonToDelete from "../features/People/components/LookupPersonToDelete";

const DeletePersonPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Logo
        image="/src/assets/images/deletePerson.png"
        direction="ROW"
        title="Delete Person"
      />
      <LookupPersonToDelete />
    </div>
  );
};

export default DeletePersonPage;
