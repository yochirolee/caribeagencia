import { Button } from "flowbite-react";
import { React } from "react";
import { useSelector } from "react-redux";
import { ProductsTable } from "../../Pages/Products/ProdcutsTables/ProductsTables";
import { Invoice } from "./Components/Invoice";

/*
 "customer": {
    "id": 2,
    "created_at": "2022-09-28T00:03:23.687458+00:00",
    "customer_name": "Yochiro",
    "customer_last_name": "Lee Cruz",
    "customer_email": "yleecruz@gmail.com",
    "customer_address": "Avenida 31 entre 30 y 34 no 3008",
    "customer_document": "84011112446",
    "customer_document_type": "Carne Identidad",
    "customer_mobile": "52678538"
  },
  "reciever": {
    "reciever_name": "Valentina",
    "reciever_last_name": "Lee Torres",
    "reciever_email": "valentina@gmail.com",
    "reciever_ci": "20124545412",
    "reciever_passport": "J44444",
    "reciever_mobile": "53798283",
    "reciever_phone": "72023834",
    "reciever_address": "Calle 62 entre 23 y 35 No 2703 Apto 3"
  },
   "products": [
    {
      "product_type": "Producto Online",
      "product_name": "1",
      "product_quantity": "1",
      "product_weight": 264,
      "product_description": "CICLOMOTOR ELECTRICO ECCO BIKE E09 Lithium 35AMP (Online)\t"
    },
    {
      "product_type": "Producto Online",
      "product_name": "1",
      "product_quantity": "1",
      "product_weight": 264,
      "product_description": "CICLOMOTOR ELECTRICO ECCO BIKE E09 Lithium 35AMP (Online)\t"
    },
	"service": "Transcargo",
  "weight": 528,
  "count": 2*/

export const Factura = () => {
	const { currentOrder } = useSelector((state) => state.OrdersSlice);

	return (
		<>
			<Invoice pdfMode={true} />
		</>
	);
};
