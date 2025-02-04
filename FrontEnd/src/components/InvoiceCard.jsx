import { useState, useEffect } from "react";
import { allInvoices } from "../helpers/get";
import Modal from "../utils/Modal";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import InvoiceEdit from "./InvoiceEdit";
const InvoiceCard = () => {
  const [invoices, setInvoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getInvoices = async () => {
    try {
      const response = await allInvoices();
      setInvoices(response.data);
      console.log(invoices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  // close modal
  const handleClose = () => {
    setIsOpen(false);
  };

  const renderInvoice = (invoices) => {
    return invoices.map((invoice) => {
      const { id, name, price, date, status } = invoice;

      const data = date.slice(0, 10);

      console.log(invoice);

      return (
        <div
          key={id}
          className="invoice-card flex w-2/4 mx-auto text-white items-center justify-center gap-5 p-3"
        >
          <div className="flex gap-20 bg-sky-950 items-center w-2/3 justify-center rounded-[7px] h-[90px]">
            <h1>
              #<span className="">{id}</span>
            </h1>
            <h3 className="text-gray-300"> Due {data}</h3>
            <h3 className="text-gray-300">{name}</h3>
            <h1 className="text-[25px]">${price}</h1>
            <div className="flex items-center">
              <h1
                style={
                  status === "Draft"
                    ? {
                        height: "13px",
                        width: "13px",
                        backgroundColor: "#ffffff",
                        borderRadius: "50%",
                        marginRight: "15px",
                      }
                    : status === "Pending"
                    ? {
                        height: "13px",
                        width: "13px",
                        backgroundColor: "#ff6505",
                        borderRadius: "50%",
                        marginRight: "15px",
                      }
                    : status === "Paid"
                    ? {
                        height: "13px",
                        width: "13px",
                        backgroundColor: "#0cc935",
                        borderRadius: "50%",
                        marginRight: "15px",
                      }
                    : {}
                }
              ></h1>
              <h3 className="flex items-center">{status}</h3>

              {/* Button */ }
              <div>
                <button onClick={handleOpen} type="button" className="flex">
                  <span className="ml-10">
                    <IoIosArrowDroprightCircle />
                  </span>
                </button>
                <Modal isOpen={isOpen} onClose={handleClose} children={<InvoiceEdit />} />
              </div>

            </div>
          </div>
        </div>
      );
    });
  };

  return <>{renderInvoice(invoices)}</>;
};

export default InvoiceCard;
