import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorHandler = ({ error }: { error: any }) => {
  useEffect(() => {
    if (!error) return;

    console.log("ERROR: " + error.message);

    // Use a unique toastId to prevent duplicate toasts
    const toastId = "error-toast";

    if ("status" in error) {
      switch (error.status) {
        case 400:
          // Validation or client-side error
          if (!toast.isActive(`${toastId}-400`)) {
            toast.error(error.message || "Invalid request.", {
              toastId: `${toastId}-400`,
            });
          }
          break;
        case 404:
          // Not found error
          if (!toast.isActive(`${toastId}-404`)) {
            toast.warn("Resource not found.", { toastId: `${toastId}-404` });
          }
          break;
        default:
          // Fallback for other recoverable errors
          if (!toast.isActive(`${toastId}-default`)) {
            toast.error("Something went wrong. Please try again.", {
              toastId: `${toastId}-default`,
            });
          }
          break;
      }
    } else {
      // Handle network errors
      if (!toast.isActive(`${toastId}-network`)) {
        toast.error("Network error. Please check your connection.", {
          toastId: `${toastId}-network`,
        });
      }
    }
  }, [error]);

  return null; // No visible UI needed; errors are displayed via toast notifications
};

export default ErrorHandler;
