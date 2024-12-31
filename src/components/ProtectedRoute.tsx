import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  children: ReactNode;
}

const ProtectedRoute = ({ children, isAllowed }: IProps) => {
  if (!isAllowed) {
    console.log("Not allowed. Redirecting to /auth/login");
    return <Navigate to="/auth/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
