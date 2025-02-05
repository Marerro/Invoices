import {useState} from "react";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceCard from "./components/InvoiceCard";
import Navigation from "./components/Navigation";

function App() {
    const [selectedDropDown, setSelectedDropDown] = useState("All");

  return (
    <>
    <Navigation />
    <InvoiceHeader handleStatus={setSelectedDropDown} /> 
    <InvoiceCard selectedDropDown={selectedDropDown} />
    </>
  );
}
export default App;
