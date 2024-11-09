import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
