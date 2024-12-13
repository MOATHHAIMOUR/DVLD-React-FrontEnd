import Box from "../../../components/ui/Box";
import Col from "../../../components/ui/Col";
import Logo from "../../../components/ui/Logo";
import ManageApplicationTypes from "../../../features/Applications/shared/Components/ManageApplicationTypes";

const ManageApplicationTypesPage = () => {
  return (
    <Col className="gap-6 h-full">
      <Logo
        image="/src/assets/images/manageUsers.png"
        direction="COL"
        title="Manage Application Types"
        imageSize="w-40 h-40"
      />
      <Box>
        <ManageApplicationTypes />
      </Box>
    </Col>
  );
};

export default ManageApplicationTypesPage;
