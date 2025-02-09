import {useState} from "react";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceCard from "./components/InvoiceCard";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import ThemeContextProvider from "./contexts/ThemeContextProvider";
import Register from "./components/Register"
import Profile from "./components/Profile";

function App() {
    const [selectedDropDown, setSelectedDropDown] = useState("All");
    const [newAddedInvoice, setNewAddedInvoice] = useState([]);

    const handleNewInvoice = (newInvoice) => {
      setNewAddedInvoice([...newAddedInvoice, newInvoice]); 
    }

  return (
    <>
    <ThemeContextProvider>
    <Navigation />
    <Routes>
    <Route path={"/register"} element={<Register />} />
    <Route path={"/login"} element={<Login />} />
    <Route path={"/profile"} element={<Profile />} />
    <Route
          path="/"
          element={
            <>
              <InvoiceHeader handleStatus={setSelectedDropDown} onNewInvoice={handleNewInvoice} />
              <InvoiceCard selectedDropDown={selectedDropDown} newAddedInvoice={newAddedInvoice}/>
            </>
          }
        />
    </Routes>
    </ThemeContextProvider>
    </>
  );
}
export default App;
