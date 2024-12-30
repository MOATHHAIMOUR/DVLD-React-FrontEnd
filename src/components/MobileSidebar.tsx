import { ReactNode, useState } from "react";
import Button from "./ui/Button";
import Box from "./ui/Box";
import { DarkModeToggle } from "./DarkModeToggle";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

interface IProps {
  children: ReactNode;
}
const MobileSidebar = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="xl:hidden p-8 absolute"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdMenu size={40} />
      </Button>

      <Box
        className={`fixed top-0 left-0 h-screen w-[360px] bg-primary  transform transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Box className="flex items-center justify-between mt-10 px-4">
          <h1 className="text-xl font-bold text-primary-foreground">
            Dashboard
          </h1>
          <Box className="flex gap-4 items-center">
            <DarkModeToggle />
            <Button onClick={() => setIsOpen(!isOpen)}>
              <BsArrowLeftCircleFill size={30} />
            </Button>
          </Box>
        </Box>

        {children}
      </Box>
    </>
  );
};

export default MobileSidebar;
