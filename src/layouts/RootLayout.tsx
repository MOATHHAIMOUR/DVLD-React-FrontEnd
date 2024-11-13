import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";
import Row from "../components/ui/Row";

const RootLayout = () => {
  return (
    <Row className="grid grid-cols-1 sm:grid-cols-[auto,1fr]">
      <Box className="w-64">
        <Sidebar />
      </Box>
      <Box className="p-8 min-w-0 min-h-screen">
        <Outlet />
      </Box>
    </Row>
  );
};

export default RootLayout;
