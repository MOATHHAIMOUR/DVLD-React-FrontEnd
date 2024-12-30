import { useMediaQuery } from "react-responsive";
import DesktopSidebar from "./DesktopSideBar";
import MobileSidebar from "./MobileSidebar";
import NavLinksSideBar from "./NavLinksSideBar";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 1279 }); // xl breakpoint is 1280px

  return (
    <>
      {isMobile ? (
        <MobileSidebar>
          <NavLinksSideBar />
        </MobileSidebar>
      ) : (
        <DesktopSidebar>
          <NavLinksSideBar />
        </DesktopSidebar>
      )}
    </>
  );
};

export default Sidebar;
