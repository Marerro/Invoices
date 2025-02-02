import {useState, useEffect} from "react"
import {allInvoices} from "../helpers/get"
const InvoiceCard = () => {

    const [invoices, setInvoices] = useState([]);

    const getInvoices = async () => {
        try {
            const response = await allInvoices();
            setInvoices(response.data);
            console.log(invoices);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInvoices();
    }, [])

    const renderInvoice = (invoices) => {

      return invoices.map((invoice) => {
            const { id, name, price, date, status } = invoice;
    
            return (
                <div key={id} className="invoice-card">
                    <h3>{name}</h3>
                    <p>{price}</p>
                    <p>{date}</p>
                    <p>{status}</p>
                </div>
            );
        });
    };

    return (
        <>
        {renderInvoice(invoices)}
        </>
    )

}

export default InvoiceCard