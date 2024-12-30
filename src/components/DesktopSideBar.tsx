import { ReactNode } from "react";
import Box from "./ui/Box";
import { DarkModeToggle } from "./DarkModeToggle";

interface IProps {
  children: ReactNode;
}
const DesktopSidebar = ({ children }: IProps) => {
  return (
    <aside
      className={` dark:border-gray-400 fixed top-0 left-0 z-40 hidden h-screen bg-primary text-primary-foreground  shadow--lg  xl:w-[360px] xl:block`}
    >
      <Box className="flex items-center justify-between mt-10 px-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Box className="flex gap-4 items-center">
          <DarkModeToggle />
        </Box>
      </Box>
      {children}
    </aside>
  );
};

export default DesktopSidebar;
