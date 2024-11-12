import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

const Col = ({ children, className }: IProps) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export default Col;
