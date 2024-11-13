import AddPersonLogo from "../features/People/components/AddPersonLogo";
import PersonForm from "../features/People/components/PersonForm";

const SavePerson = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col gap-10 shadow h-[100%]">
      <AddPersonLogo />
      <PersonForm />
    </div>
  );
};

export default SavePerson;
