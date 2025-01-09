import { memo, forwardRef, ReactNode, SelectHTMLAttributes } from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
}

const SelectMenu = forwardRef<HTMLSelectElement, IProps>(
  ({ children, className, onChange, ...rest }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          onChange={onChange}
          className={`${className} bg-primary cursor-pointer text-primary-foreground p-[5px] text-[17px] rounded-lg w-full max-h-32 overflow-y-auto`}
          {...rest}
        >
          {children}
        </select>
      </div>
    );
  }
);

export default memo(SelectMenu);
