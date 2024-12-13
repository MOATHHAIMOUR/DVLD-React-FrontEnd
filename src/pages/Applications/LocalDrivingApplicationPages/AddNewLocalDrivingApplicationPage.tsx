import Logo from "../../../components/ui/Logo";
import NewLocalDrivingApplicationForm from "../../../features/Applications/LocalDrivingApplication/Components/NewLocalDrivingApplicationForm";

const AddNewLocalDrivingApplicationPage = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col shadow h-[100%]">
      <Logo
        direction="ROW"
        title="Add New Local Driving License Application"
        image="/src/assets/images/addUser.png"
      />
      <NewLocalDrivingApplicationForm />
    </div>
  );
};

export default AddNewLocalDrivingApplicationPage;
