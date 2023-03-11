import { React } from "react";
import { truncateString } from "../../Utils/truncateString";
export const ReportProductsTable = ({
	containerData,
	setSelectedProduct,
	setShowModalDetails,
}) => {
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
							{containerData?.map((data, index) => (
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
										{data?.HBL}
									</td>
									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{data?.ProductType}
									</td>
									<td className="text-xs text-gray-900 font-light px-4 py-4 whitespace-nowrap">
										{truncateString(data?.Description, 10)}
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
