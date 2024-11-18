import { memo, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onchange: (value: string) => void;
  className?: string;
}

const SelectMenu = ({ children, className, onchange }: IProps) => {
  return (
    <select
      onChange={(e) => onchange(e.target.value)}
      className={`${className} p-[5px] bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    >
      {children}
    </select>
  );
};

export default memo(SelectMenu);
