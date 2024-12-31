import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ children, isAuthenticated }: IProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
