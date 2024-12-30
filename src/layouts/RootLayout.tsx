import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";
import Row from "../components/ui/Row";

const RootLayout = () => {
  return (
    <Row className="grid grid-cols-[auto,1fr]">
      <Box className="xl:w-[328px] mr-8">
        <Sidebar />
      </Box>
      <Box className="px-8 py-8 min-w-0 min-h-screen   bg-gradient-to-br from-bgDefault-800 via-bgDefault-900 to-bgDefault-black">
        <Outlet />
      </Box>
    </Row>
  );
};

export default RootLayout;
