import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
const DesktopSidebar = ({ children }: IProps) => {
  return (
    <aside
      className={`dark:border-gray-400 fixed top-0 left-0 z-40 hidden h-screen bg-primary text-primary-foreground  shadow--lg  xl:w-[400px] xl:block ltr:left-0 rtl:right-0 transition-all`}
    >
      {children}
    </aside>
  );
};

export default DesktopSidebar;
