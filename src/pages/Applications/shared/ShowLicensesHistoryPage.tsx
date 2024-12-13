import Box from "../../../components/ui/Box";
import Col from "../../../components/ui/Col";
import Logo from "../../../components/ui/Logo";
import ShowLicensesHistory from "../../../features/Applications/shared/Components/ShowLicensesHistory";

const ShowLicensesHistoryPage = () => {
  return (
    <Col className="gap-6 h-full">
      <Logo
        image="/src/assets/images/manageUsers.png"
        direction="ROW"
        title="Licenses History"
      />
      <Box>
        <ShowLicensesHistory />
      </Box>
    </Col>
  );
};

export default ShowLicensesHistoryPage;
