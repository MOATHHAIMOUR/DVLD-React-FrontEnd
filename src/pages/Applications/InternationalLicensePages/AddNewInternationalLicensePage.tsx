import Logo from "../../../components/ui/Logo";
import AddNewInternationalLicenseApplication from "../../../features/Applications/InternationalLicenseApplication/Components/AddNewInternationalLicense";

const AddNewInternationalDrivingApplicationPage = () => {
  return (
    <div className="mx-auto bg-white p-8 rounded flex flex-col shadow h-[100%]">
      <Logo
        direction="ROW"
        title="Add New International License"
        image="/src/assets/images/license.png"
      />
      <AddNewInternationalLicenseApplication />
    </div>
  );
};

export default AddNewInternationalDrivingApplicationPage;
