import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { UserContextProvider } from './contexts/UserContext.jsx'
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
);
