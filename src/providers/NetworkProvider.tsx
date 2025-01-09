import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../store";
import { SetOffline, SetOnline } from "../store/NetworkSlice";

interface IProps {
  children: ReactNode;
}

const NetworkProvider = ({ children }: IProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleOnline = () => {
      dispatch(SetOnline());
    };

    const handleOffline = () => {
      dispatch(SetOffline());
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default NetworkProvider;
