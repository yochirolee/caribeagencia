import { React, useState } from "react";
import CustomerComboBox from "../Components/Customers/ComboBox/CustomerComboBox";
import CustomerModal from "../Components/Customers/Modals/CustomerModal";
import { Card } from "@tremor/react";
import { CustomerMiniDetails } from "../Components/Customers/Details/CustomerMiniDetails";
import { InvoiceStore } from "../Store/InvoiceStore";
import { shallow } from "zustand/shallow";
import RecieverForm from "../Components/Customers/Forms/RecieverForm";

export const CreateInvoicePage = () => {
	const [isOpen, setIsOpen] = useState(false);
	let customer = InvoiceStore((state) => state.invoice.customer, shallow);

	console.log(customer, "selectedCustomer");
	const [product, setProduct] = useState({});
	const [productList, setProductList] = useState([]);

	return (
		<div className="p-2 md:p-4 lg:p-10 ">
			<Card>Invoices {customer?.firstName}</Card>
			<Card className="mt-6 ">
				<div className="grid grid-flow-col grid-cols-2  gap-4">
					<div className="px-10 ">
						<h3 className="py-2 text-base font-semibold leading-6 text-gray-900">
							Datos Personales del Cliente
						</h3>
						<div className="flex space-x-4 items-center ">
							<CustomerComboBox />
							<CustomerModal isOpen={isOpen} setIsOpen={setIsOpen} />
						</div>
						{customer ? <CustomerMiniDetails customer={customer} /> : ""}
					</div> 
					<div className=" px-10">
						<h3 className="py-2 text-base font-semibold leading-6 text-gray-900">
							Datos Persona que Recibe
						</h3>
						<div className="flex space-x-4 items-center  ">
							<RecieverForm isOpen={isOpen} setIsOpen={setIsOpen} />
						</div>
					</div>
				</div>
			</Card>

			<Card className="mt-4 ">
				<h2>Lista de Productos</h2>
				<Card className="bg-gray-50">
					<input className="" type="search"></input>
				</Card>
			</Card>
		</div>
	);
};
