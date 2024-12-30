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
        className={`${className}  bg-primary cursor-pointer text-primary-foreground p-[5px] text-sm rounded-lg`}
        {...rest}
      >
        {children}
      </select>
    );
  }
);

export default memo(SelectMenu);
