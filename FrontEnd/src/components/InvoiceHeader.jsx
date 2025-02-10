import { countofInvoices } from "../helpers/get";
import { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import NewInvoiceModal from "./newInvoiceModal";
import  {UserContext}  from "../contexts/UserContext";
import { useContext } from "react"; 

const InvoiceHeader = ({ handleStatus, onNewInvoice }) => {
  const [invoices, setInvoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user, loading } = useContext(UserContext); 

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await countofInvoices();
        const { count } = response.allInvoices[0];

        setInvoices(count);
      } catch (error) {
        console.log("API request failed", error.message);
      }
    };

    fetchInvoices();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
}

console.log(user);

  // open modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Invoice Header */}
      <div className="header w-1/2 m-auto mt-3 flex pb-[60px]">
        <div>
          <h1 className="text-white inconsolata text-[40px]">Invoices</h1>
          <p className="text-white fira">There are {invoices} total invoices</p>
        </div>

        {/* Filter by status */}
        <div className="ml-auto flex items-center">
          <h4 className="text-white">Filter by status </h4>

          {/* Button for dropdown */}
          <button
            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            type="button"
            id="dropdown"
            className=""
          >
            <MdArrowDropDown className="w-[25px] h-[25px] text-[#7E88C3]" />
          </button>

          <div
            id="myDropdown"
            className={`dropdown-content ${isDropDownOpen ? "show" : ""}`}
          >
            <button onClick={() => handleStatus("All")} className="text-white">
              All
            </button>
            <button
              onClick={() => handleStatus("Draft")}
              className="text-white"
            >
              Draft
            </button>
            <button
              onClick={() => handleStatus("Pending")}
              className="text-white"
            >
              Pending
            </button>
            <button onClick={() => handleStatus("Paid")} className="text-white">
              Paid
            </button>
          </div>
        </div>

        {/*Button */}
        {user && user.roles === "admin" && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleOpen}
              className="text-white flex items-center gap-2 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-300 font-medium rounded-full text-sm px-3 p-1 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              <CiCirclePlus className="w-[25px] h-[25px]" /> New Invoice
            </button>
          </div>
        )}

        <NewInvoiceModal
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
          onNewInvoice={onNewInvoice}
        />
      </div>
    </>
  );
};

export default InvoiceHeader;
