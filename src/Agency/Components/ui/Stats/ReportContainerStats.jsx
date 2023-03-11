import { React, useMemo } from "react";
import { sumFields } from "../../../Utils/calculateCostByContainer";

export const ReportContainerStats = ({ filteredProducts, selectedAgency }) => {
	const uniqueInvoices = [
		...new Map(filteredProducts?.map((item) => [item["InvoiceId"], item])).values(),
	];
	const weight = useMemo(
		() => sumFields(filteredProducts, "Weight"),
		[filteredProducts, selectedAgency],
	);

	const total = useMemo(
		() => sumFields(filteredProducts, "AgencyPayment"),
		[filteredProducts, selectedAgency],
	);

	const delivery = useMemo(
		() => sumFields(filteredProducts, "DeliveryCost"),
		[uniqueInvoices, selectedAgency],
	);

	const discount = useMemo(() => sumFields(uniqueInvoices, "Discount"), [uniqueInvoices]);

	return (
		<div className="mt-6 grid  justify-center flex-wrap bg-gray-50 w-full ">
			<div className="p-1 flex flex-wrap flex-col lg:flex-row gap-2 lg:gap-10">
				<div className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className="p-2 rounded-lg text-gray-700">No. Facturas</span>
					<h3>{uniqueInvoices?.length}</h3>
				</div>
				<div className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className="p-2 rounded-lg text-gray-700">Peso:</span>
					<h3>{weight} Lbs</h3>
				</div>
				<div className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className="p-2 rounded-lg text-gray-700">Total Cobrado</span>
					<h3>$ {total}</h3>
				</div>
				<div className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className="p-2 rounded-lg text-gray-700">Total Descontado</span>
					<h3>$ {discount}</h3>
				</div>

				<div className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className="p-2 rounded-lg text-gray-700">Total Delivery Cobrado</span>
					<h3>$ {delivery}</h3>
				</div>

				<div className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className="p-2 rounded-lg text-gray-700">Ganancia:</span>
					<h3>$ {parseFloat(total - discount).toFixed(2)}</h3>
				</div>
			</div>
		</div>
	);
};
