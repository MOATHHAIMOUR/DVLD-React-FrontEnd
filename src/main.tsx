import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.ts";
import { Provider as ReduxProvider } from "react-redux";
import NetworkProvider from "./providers/NetworkProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <NetworkProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </NetworkProvider>
  </ReduxProvider>
);
