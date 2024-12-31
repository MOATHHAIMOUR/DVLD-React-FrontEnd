import { ToastContainer } from "react-toastify";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS here
import Box from "./components/ui/Box";
import { useEffect } from "react";
import { useLazyRefreshTokenQuery } from "./features/Auth/store/AuthApiSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [triggerRefreshToken, { isSuccess, isError }] =
    useLazyRefreshTokenQuery();

  useEffect(() => {
    triggerRefreshToken(); // Attempt to refresh the token on app load
  }, [triggerRefreshToken]);
  useEffect(() => {
    // Navigate to the index page if the refresh token is successful
    if (isSuccess) {
      navigate("/");
    }

    // Optionally, handle errors (e.g., navigate to login page)
    if (isError) {
      navigate("/auth/login");
    }
  }, [isSuccess, isError, navigate]);

  return (
    <Box className="">
      <Router />
      <ToastContainer />
    </Box>
  );
}

export default App;
