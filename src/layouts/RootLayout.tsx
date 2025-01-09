import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";
import Row from "../components/ui/Row";
import TopNavBar from "../components/TopNavBar";

const RootLayout = () => {
  return (
    <Row className="grid grid-cols-[auto,1fr]">
      <Box className="xl:w-[400px]">
        <Sidebar />
      </Box>
      <Box className="min-w-0 min-h-screen bg-gradient-to-br from-bgDefault-800 via-bgDefault-900 to-bgDefault-black">
        <TopNavBar />
        <Outlet />
      </Box>
    </Row>
  );
};

export default RootLayout;
