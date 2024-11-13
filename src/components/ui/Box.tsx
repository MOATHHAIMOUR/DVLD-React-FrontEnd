import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ children, className }: IProps) => {
  return <div className={className}>{children}</div>;
};

export default Box;
