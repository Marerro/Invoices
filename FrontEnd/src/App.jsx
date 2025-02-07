import {useState} from "react";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceCard from "./components/InvoiceCard";
import Navigation from "./components/Navigation";
import Login from "./components/Register";
import { Route, Routes } from "react-router";
import ThemeContextProvider from "./contexts/ThemeContextProvider";

function App() {
    const [selectedDropDown, setSelectedDropDown] = useState("All");

  return (
    <>
    <ThemeContextProvider>
    <Navigation />
    <Routes>
    <Route path={"/login"} element={<Login />} />
    <Route
          path="/"
          element={
            <>
              <InvoiceHeader handleStatus={setSelectedDropDown} />
              <InvoiceCard selectedDropDown={selectedDropDown} />
            </>
          }
        />
    </Routes>
    </ThemeContextProvider>
    </>
  );
}
export default App;
