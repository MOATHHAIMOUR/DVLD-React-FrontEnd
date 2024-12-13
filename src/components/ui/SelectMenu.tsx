import { memo, forwardRef, ReactNode, SelectHTMLAttributes } from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

const SelectMenu = forwardRef<HTMLSelectElement, IProps>(
  ({ children, className, onChange, ...rest }, ref) => {
    return (
      <select
        ref={ref}
        onChange={onChange}
        className={`${className} hover:bg-primaryHover cursor-pointer bg-primary text-text p-[5px] bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

export default memo(SelectMenu);
