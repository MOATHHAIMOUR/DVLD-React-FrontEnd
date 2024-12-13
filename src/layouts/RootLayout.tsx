import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Box from "../components/ui/Box";
import Row from "../components/ui/Row";
import { useAppSelector } from "../store";
import { useEffect } from "react";

const RootLayout = () => {
  const theme = useAppSelector((state) => state.theme.selectedTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Row className="grid grid-cols-1 sm:grid-cols-[auto,1fr]">
      <Box className="w-[328px]">
        <Sidebar />
      </Box>
      <Box className="p-8 min-w-0 min-h-screen">
        <Outlet />
      </Box>
    </Row>
  );
};

export default RootLayout;
