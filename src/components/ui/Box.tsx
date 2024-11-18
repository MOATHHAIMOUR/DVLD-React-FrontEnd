import { ReactNode, HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Box = ({
  children,
  className = "",
  disabled = false,
  ...rest
}: IProps) => {
  return (
    <div
      {...rest}
      className={`${
        disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Box;
