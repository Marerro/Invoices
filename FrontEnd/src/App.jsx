import {useState} from "react";
import InvoiceHeader from "./components/InvoiceHeader";
import InvoiceCard from "./components/InvoiceCard";

function App() {
    const [selectedDropDown, setSelectedDropDown] = useState("All");
  return (
    <>
    <InvoiceHeader handleStatus={setSelectedDropDown} /> 
    <InvoiceCard selectedDropDown={selectedDropDown} />
    </>
  );
}
export default App;
