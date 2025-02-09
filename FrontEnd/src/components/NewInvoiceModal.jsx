import { postInvoice } from "../helpers/post";
import { useState } from "react";
import Modal from "../utils/Modal";
import { useForm } from "react-hook-form";
function NewInvoiceModal({ isOpen, handleClose, onNewInvoice }) {
  const [message, setMessage] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const newInvoice = await postInvoice(data);
      onNewInvoice(newInvoice);
      if (newInvoice) {
        setMessage("Invoice created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
              {message && <p className=" p-1.5 text-green-500">{message}</p>}
            </div>
          </form>
        </>
      </Modal>
    </>
  );
}

export default NewInvoiceModal;
