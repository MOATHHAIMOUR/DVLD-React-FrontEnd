import { ReactNode, useState } from "react";
import Button from "./ui/Button";
import Box from "./ui/Box";
import { MdMenu } from "react-icons/md";
import { BiXCircle } from "react-icons/bi";

interface IProps {
  children: ReactNode;
}
const MobileSidebar = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute cursor-pointer z-30 blur-md inset-0  bg-black opacity-40"
        ></div>
      )}
      <Button
        className="xl:hidden  pt-5 pl-4 absolute "
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdMenu size={40} />
      </Button>

      <Box
        className={`z-40  fixed top-0 ltr:left-0 rtl:right-0 h-screen w-full sm:w-[360px] bg-primary  transform transition-all duration-300 ${
          isOpen
            ? "translate-x-0"
            : "ltr:-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex justify-center w-full mt-4">
          <BiXCircle
            onClick={() => setIsOpen(false)}
            size={44}
            className="text-white ml-auto mr-3 cursor-pointer "
          />
        </div>
        {children}
      </Box>
    </>
  );
};

export default MobileSidebar;
