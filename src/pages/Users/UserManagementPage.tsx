import Box from "../../components/ui/Box";
import Col from "../../components/ui/Col";
import Logo from "../../components/ui/Logo";
import ManageUsers from "../../features/User/components/ManageUsers";

const UserManagementPage = () => {
  return (
    <Col className="gap-6 h-full">
      <Logo
        image="/src/assets/images/manageUsers.png"
        direction="COL"
        title="Manage Users"
        imageSize="w-40 h-40"
      />
      <Box>
        <ManageUsers />
      </Box>
    </Col>
  );
};

export default UserManagementPage;
