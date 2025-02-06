import {useState} from "react";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceCard from "./components/InvoiceCard";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import { Route, Routes } from "react-router";

function App() {
    const [selectedDropDown, setSelectedDropDown] = useState("All");

  return (
    <>
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
    </>
  );
}
export default App;
