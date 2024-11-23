import AddPersonLogo from "../../features/People/components/AddPersonLogo";
import PersonForm from "../../features/People/components/PersonForm";
import { enumFormMode } from "../../interfaces";

const AddNewPersonPage = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col gap-10 shadow h-[100%]">
      <AddPersonLogo />
      <PersonForm mode={enumFormMode.Add} />
    </div>
  );
};

export default AddNewPersonPage;
