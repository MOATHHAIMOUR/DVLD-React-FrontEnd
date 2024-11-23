import Logo from "../../components/ui/Logo";
import LookupUserToDisplayInfo from "../../features/User/components/LookupUserToDisplayInfo";

const FindUserPage = () => {
  return (
    <div className=" flex gap-8 flex-col">
      <Logo
        image="/src/assets/images/findPerson.png"
        direction="ROW"
        title="Find User"
      />
      <LookupUserToDisplayInfo />
    </div>
  );
};

export default FindUserPage;
