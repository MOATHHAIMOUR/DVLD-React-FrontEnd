import { useLocation } from "react-router-dom";
import Logo from "../components/ui/Logo";
import PersonDetail from "../features/People/components/PersonDetail";

const PersonDetailsPage = () => {
  /* ────────────── STATE  ────────────── */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const personId = queryParams.get("personId");

  return (
    <div className="flex flex-col gap-10">
      <Logo
        image="/src/assets/images/personDetails.png"
        direction="ROW"
        title="Person Details"
      />
      <PersonDetail personId={Number(personId)} key={personId} />
    </div>
  );
};

export default PersonDetailsPage;
