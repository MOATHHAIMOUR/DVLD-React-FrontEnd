import { ToastContainer } from "react-toastify";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS here
import Box from "./components/ui/Box";

function App() {
  return (
    <Box className="bg-background  border-border">
      <Router />
      <ToastContainer />
    </Box>
  );
}

export default App;
