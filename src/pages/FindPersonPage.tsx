import Logo from "../components/ui/Logo";
import LookupPersonToDisplayInfo from "../features/People/components/LookupPersonToDisplayInfo";

const FindPersonPage = () => {
  return (
    <div className=" flex gap-8 flex-col">
      <Logo
        image="/src/assets/images/findPerson.png"
        direction="ROW"
        title="Find Person"
      />
      <LookupPersonToDisplayInfo />
    </div>
  );
};

export default FindPersonPage;
