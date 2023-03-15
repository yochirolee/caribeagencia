import { React } from "react";
import { truncateString } from "../../Utils/truncateString";
import { GroupBy } from "../../Utils/GroupBy";

export const ReportInvoicesTable = ({ containerData, setSelectedProduct, setShowModalDetails }) => {
	let uniqueInvoices = GroupBy(containerData, "InvoiceId");
	let Invoices = [];

	for (const [key, value] of Object.entries(uniqueInvoices)) {
		Invoices.push({
			InvoiceId: key,
			Provincia: value[0].Provincia,
			Municipio: value[0].Municipio,
			ProductType: value[0].ProductType,
			TotalWeight:value.map((item)=>parseFloat(item.Weight)).reduce((a,b)=>a+b,0),
			HBLS: [...value],
		});
	}
	

	const handleShowDetails = (data) => {
		setSelectedProduct(data);
		setShowModalDetails(true);
	};
	return (
		<div className="overflow-x-auto container text-sx ">
			<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden h-[calc(100vh-40rem)] overflow-y-auto ">
					<table className="min-w-full text-center ">
						<thead className="border-b bg-gray-50">
							<tr>
								<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
									Factura
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
									Agencia
								</th>

								<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
									HBL Count
								</th>

								<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
									Peso Factura (Lbs)
								</th>

								<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
									Provincia
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
									Municipio
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
							{Invoices?.map((data, index) => (
								<tr key={index} className="bg-white border-b ">
									<td
										onClick={() => handleShowDetails(data)}
										className="text-xs text-gray-900 font-light px-4 py-4 cursor-pointer whitespace-nowrap"
									>
										<i className="fa fa-invoice"></i> {data?.InvoiceId}
									</td>
									<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
										{data?.AgencyName}
									</td>

									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										Por Calcular
									</td>
									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{data?.ProductType}
									</td>
									
									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{data?.Weight}
									</td>
									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{data?.Provincia}
									</td>
									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{data?.Municipio}
									</td>

									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{parseFloat(data.AgencyPayment / data?.Weight).toFixed(2)}
									</td>

									<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{data?.Discount}
									</td>
									<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{data?.AgencyPayment}
									</td>
									<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										{data?.DeliveryCost}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
