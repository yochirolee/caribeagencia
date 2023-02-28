import { React, useMemo } from "react";

const truncateString = (str, num) => {
	if (str.length <= num) {
		return str;
	}
	return str.slice(0, num) + "...";
};

const calculateTotalPaidByAgencies = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumWithInitial = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.AgencyPayment);
	}, initialValue);

	return parseFloat(sumWithInitial).toFixed(2);
	// Expected output: 10
};

const calculateTotalweight = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotalWeight = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Weight);
	}, initialValue);

	return parseFloat(sumTotalWeight).toFixed(2);
	// Expected output: 10
};

const calculateTotalDiscount = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotalDiscount = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Discount);
	}, initialValue);

	return parseFloat(sumTotalDiscount).toFixed(2);
	// Expected output: 10
};

const calculateDiscountByInvoices = (containerData) => {
	const key = "Discount";
	const uniqueInvoices = [...new Map(containerData.map((item) => [item[key], item])).values()];

	const initialValue = 0;

	const sumTotalDiscount = uniqueInvoices.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Discount);
	}, initialValue);

	console.log(uniqueInvoices);
	return parseFloat(sumTotalDiscount).toFixed(2);
};

export const TableContainerIncome = ({ containerData }) => {
	const totalPaidByAgencies = useMemo(
		() => calculateTotalPaidByAgencies(containerData),
		[containerData],
	);

	const totalWeight = useMemo(() => calculateTotalweight(containerData), [containerData]);
	const totalDiscount = useMemo(
		() => calculateDiscountByInvoices(containerData),
		[containerData],
	);

	return (
		<div className="flex flex-col border-b gap-4 text-xs my-4 p-4 ">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="flex items-center justify-end gap-4 mx-6 ">
					<div className="font-semibold flex justify-end items-center gap-2">
						Total Facturado:
						<span className="px-2 py-0.5 bg-blue-200 rounded-lg text-blue-800">{parseFloat(totalPaidByAgencies-totalDiscount).toFixed(2)}</span>
					</div>
					<div className="font-semibold flex justify-end items-center gap-2">
						Total por Descuento:
						<span className="px-2 py-0.5 bg-green-200 rounded-lg text-green-800">
							{" "}
							{totalDiscount ? totalDiscount : 0}
						</span>
					</div>
					<div className="font-semibold flex justify-end items-center gap-2">
						Peso Total:
						<span className="px-2 py-0.5 bg-green-200 rounded-lg text-green-800">
							{totalWeight ? totalWeight : 0}
						</span>
					</div>
					<div className="font-semibold justify-end flex items-center gap-2">
						Total Pagado por Agencias:
						<span className="px-2 py-0.5 bg-yellow-200 rounded-lg text-yellow-800">
							{totalPaidByAgencies ? totalPaidByAgencies : 0}
						</span>
					</div>
				</div>
				<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden h-[calc(100vh-21rem)] overflow-y-auto ">
						<table className="min-w-full text-center ">
							<thead className="border-b bg-gray-50">
								<tr>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Agencia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Factura
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										HBL
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Tipo de Producto
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Descripcion
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Peso (Lbs)
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Precio Agencia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Descuento
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Pagado por Agencia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Delivery
									</th>
								</tr>
							</thead>
							<tbody>
								{containerData?.map((data, index) => (
									<tr key={index} className="bg-white border-b">
										<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
											{data?.AgencyName}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.InvoiceId}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.HBL}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.ProductType}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{truncateString(data?.Description, 10)}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.Weight}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{parseFloat(data.AgencyPayment / data?.Weight).toFixed(2)}
										</td>

										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{data?.Discount}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{data?.AgencyPayment}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{data?.DeliveryCost}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
