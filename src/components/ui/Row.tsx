import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className: string;
}

const Row = ({ children, className }: IProps) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default Row;
