import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  children: ReactNode;
  redirectPath: string;
}

const ProtectedRoute = ({ children, isAllowed, redirectPath }: IProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
