import { countofInvoices } from "../helpers/get";
import { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "../utils/Modal";
import { useForm } from "react-hook-form";
import { postInvoice } from "../helpers/post";

const InvoiceHeader = ({ handleStatus }) => {
  const [invoices, setInvoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { register, handleSubmit } = useForm();

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

  // open modal
  const handleOpen = () => {
    setIsOpen(true);
  };

  // close modal
  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const newInvoice = await postInvoice(data);

      if (newInvoice) {
        setMessage("Invoice created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Invoice Header */}
      <div className="header w-1/2 m-auto mt-10 flex pb-10">
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
            <button onClick={() => handleStatus("All")}>All</button>
            <button onClick={() => handleStatus("Draft")}>Draft</button>
            <button onClick={() => handleStatus("Pending")}>Pending</button>
            <button onClick={() => handleStatus("Paid")}>Paid</button>
          </div>
        </div>

        {/*Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleOpen}
            className="text-white flex items-center gap-2 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-1 focus:ring-purple-300 font-medium rounded-full text-sm px-3 p-1 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <CiCirclePlus className="w-[25px] h-[25px]" /> New Invoice
          </button>

          <Modal
            isOpen={isOpen}
            onClose={handleClose}
            className="border-2 bg-red-700 w-[150px] h-[100px]"
          >
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <h1 className="text-white fira">Add Invoice</h1>
                </div>

                {/* Name */}
                <div className="p-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 inconsolata text-[15px] font-[500] text-white"
                  >
                    Full name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="block m-auto p-4 border w-[220px] h-[25px] text-red-800 border-gray-300 rounded-lg text-center"
                  ></input>
                </div>

                {/* Price */}
                <div className="">
                  <label
                    htmlFor="price"
                    className="block mb-2 inconsolata text-[15px] font-[500] text-white"
                  >
                    Price
                  </label>
                  <input
                    {...register("price")}
                    type="text"
                    id="price"
                    className="block m-auto p-4 border w-[220px] h-[25px] text-red-800 border-gray-300 rounded-lg text-center"
                  ></input>
                </div>

                {/* Submit Button */}
                <div className="p-7">
                  <button
                    type="submit"
                    className="w-[220px] h-[35px] text-gray-900 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-[#F7BE38]/90 focus:ring-1 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm text-center dark:focus:ring-[#F7BE38]/50"
                  >
                    Add Invoice
                  </button>
                  {message && (
                    <p className=" p-1.5 text-green-500">{message}</p>
                  )}
                </div>
              </form>
            </>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default InvoiceHeader;
