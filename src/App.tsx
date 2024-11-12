import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS here

function App() {
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
