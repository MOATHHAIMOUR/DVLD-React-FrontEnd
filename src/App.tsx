import { ToastContainer } from "react-toastify";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS here
import Box from "./components/ui/Box";
import { useEffect } from "react";
import { useLazyRefreshTokenQuery } from "./features/Auth/store/AuthApiSlice";

function App() {
  const [triggerRefreshToken] = useLazyRefreshTokenQuery();

  useEffect(() => {
    triggerRefreshToken(); // Attempt to refresh the token on app load
  }, [triggerRefreshToken]);

  return (
    <Box className="">
      <Router />
      <ToastContainer />
    </Box>
  );
}

export default App;
