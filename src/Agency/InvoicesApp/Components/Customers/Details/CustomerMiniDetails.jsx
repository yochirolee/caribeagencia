import { XCircleIcon } from "@heroicons/react/24/outline";
import { InvoiceStore } from "../../../Store/InvoiceStore";
import { List, ListItem } from "@tremor/react";

export const CustomerMiniDetails = ({ customer }) => {
	const handleRemoveSelectedCustomer = () => {
		InvoiceStore.setState({ invoice: { customer: null } });
	};
	return (
		<div className="overflow-hidden bg-gray-50 rounded-lg lg:px-8 p-2 ">
			<div className="flex justify-between items-center">
				<h3 className="py-2 text-base font-semibold leading-6 text-gray-900">
					{customer.firstName + " " + customer.lastName}
				</h3>
				<XCircleIcon
					onClick={handleRemoveSelectedCustomer}
					className="h-5 w-5 cursor-pointer text-red-400"
				/>
			</div>
			<List>
				<ListItem>
					<span>Movil:</span>
					<span>{customer.mobile}</span>
				</ListItem>
				<ListItem>
					<span>Correo:</span>
					<span>{customer.email}</span>
				</ListItem>
				<ListItem>
					<span>Direccion:</span>
					<span>{customer.address}</span>
				</ListItem>
			</List>
		</div>
	);
};
