import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  children: ReactNode;
}

const NetworkProvider = ({ children }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOnline, setIsOnline] = useState(true);

  const addToast = () => {
    toast.error("You are offline!", {
      position: "top-right",
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: false,
    });
  };

  const removeToast = () => {
    toast.dismiss();
    toast.success("You are back online!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      removeToast();
    };

    const handleOffline = () => {
      setIsOnline(false);
      addToast();
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
};

export default NetworkProvider;
