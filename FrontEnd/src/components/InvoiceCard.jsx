import { useState, useEffect } from "react";
import { allInvoices } from "../helpers/get";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import InvoiceEdit from "./InvoiceEdit";
import {deleteInvoice} from "../helpers/delete"
import { MdDeleteOutline } from "react-icons/md";
const InvoiceCard = ({selectedDropDown}) => {
  const [invoices, setInvoices] = useState([]); // To store the invoices
  const [isOpen, setIsOpen] = useState(false); // To control the modal
  const [selectedInvoice, setSelectedInvoice] = useState(null); // To store the selected invoice
  const [deleteSelected, setDeleteSelected] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await allInvoices();
      setInvoices(response.data);
      setFilteredInvoices(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getInvoices();
  }, []);

  const invoiceDelete = async (id) => {
    try {
      const response = await deleteInvoice(id);
      setDeleteSelected(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpen = (invoice) => {
    setIsOpen(true);
    setSelectedInvoice(invoice); // Set the selected invoice
  };

  // close modal
  const handleClose = () => {
    setIsOpen(false);
    setSelectedInvoice(null);
  };

  useEffect(() => {
    const updatedInvoices = invoices.filter((invoice) => {
      if (selectedDropDown === "All") return true;
      return invoice.status === selectedDropDown;
    });
    setFilteredInvoices(updatedInvoices);
  }, [selectedDropDown, invoices]);

  const renderInvoice = (invoices) => {
    return invoices.map((invoice) => {
      const { id, name, price, date, status } = invoice;

      const data = date.slice(0, 10);

      return (
        <div
          key={id}
          className="invoice-card flex w-3/4 mx-auto text-white items-center justify-center p-3"
        >
          <div className="grid grid-cols-6  justify-items-center bg-gradient-to-r from-[#1B3444] to-[#244C66] shadow-md items-center w-2/3 justify-center rounded-[7px] h-[50px]">
            <h1>
              #<span className="fira">{id}</span>
            </h1>
            <h3 className="text-gray-300 fira text-[14px]"> Due {data}</h3>
            <h3 className="text-gray-300 fira">{name}</h3>
            <h1 className="text-[25px] fira">${price}</h1>
            <div
              className={`flex items-center rounded-md px-3 py-1.5 ${
                status === "Draft"
                  ? "bg-gray-700 text-white"
                  : status === "Pending"
                  ? "bg-[#ff9500] text-orange-200"
                  : status === "Paid"
                  ? "bg-green-700 text-green-300"
                  : "bg-gray-500 text-gray-300"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full mr-2"
                style={{
                  backgroundColor:
                    status === "Draft"
                      ? "#ffffff"
                      : status === "Pending"
                      ? "#ff6505"
                      : status === "Paid"
                      ? "#0cc935"
                      : "#ffffff",
                }}
              ></span>
              <span className="text-sm inconsolata">{status}</span>
            </div>
            {/* Button to open edit modal */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleOpen(invoice)}
                type="button"
                className="flex items-center"
              >
                <span className="ml-2">
                  <IoIosArrowDroprightCircle />
                </span>
              </button>
              <button
              onClick={() => invoiceDelete(id)}
              type="button"
              className="flex items-center"
              ><span></span><MdDeleteOutline /></button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {selectedDropDown ? (
        renderInvoice(filteredInvoices)
      ) :
        renderInvoice(invoices)}

      {/* Send props to InvoiceEdit component */}
      {isOpen && selectedInvoice && (
        <InvoiceEdit
          invoice={selectedInvoice}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default InvoiceCard;
