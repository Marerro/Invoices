import { useState, useEffect } from "react";
import { allInvoices } from "../helpers/get";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import InvoiceEdit from "./InvoiceEdit";
import { deleteInvoice } from "../helpers/delete";
import { MdDeleteOutline } from "react-icons/md";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const InvoiceCard = ({ selectedDropDown }) => {
  const [invoices, setInvoices] = useState([]); // To store the invoices
  const [isOpen, setIsOpen] = useState(false); // To control the modal
  const [selectedInvoice, setSelectedInvoice] = useState(null); // To store the selected invoice
  const [deleteSelected, setDeleteSelected] = useState(null);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const { user, loading } = useContext(UserContext);

  const getInvoices = async () => {
    try {
      const response = await allInvoices();
      setInvoices(response.data);
      console.log(response.data);
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
    } catch (error) {
      console.log(error);
    }
  };

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const renderInvoice = (invoices) => {
    return invoices.map((invoice) => {
      const { id, name, price, date, status, customid } = invoice;

      const data = date.slice(0, 10);

      return (
        <div
          key={id}
          className="invoice-card flex w-[100%] mx-auto text-white items-center justify-center pt-5 "
        >
          <div className="grid grid-cols-6 justify-items-center bg-[#1E2139] shadow-md items-center w-2/4 justify-center rounded-[7px] h-[70px]">
            <h1>
              #<span className="fira">{customid}</span>
            </h1>
            <h3 className="text-gray-300 fira text-[14px]"> Due {data}</h3>
            <h3 className="text-gray-300 fira">{name}</h3>
            <h1 className="text-[25px]">${price}</h1>
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

            {user && user.roles === "admin" && (
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
                >
                  <span></span>
                  <MdDeleteOutline />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {selectedDropDown
        ? renderInvoice(filteredInvoices)
        : renderInvoice(invoices)}

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
