import { useLocation } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import PersonDetail from "../../features/People/components/PersonDetail";
import Box from "../../components/ui/Box";

const PersonDetailsPage = () => {
  /* ────────────── STATE  ────────────── */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const personId = queryParams.get("personId");

  return (
    <div className="h-[100%] flex flex-col gap-10">
      <Logo
        image="/src/assets/images/personDetails.png"
        direction="ROW"
        title="Person Details"
      />
      <Box className="flex-grow-[1]">
        <PersonDetail personId={Number(personId)} key={personId} />
      </Box>
    </div>
  );
};

export default PersonDetailsPage;
