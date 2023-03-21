import { React, useRef } from "react";
import { truncateString } from "../../Utils/truncateString";
import { useDownloadExcel } from "react-export-table-to-excel";

export const ReportProductsTable = ({
	containerData,
	setSelectedProduct,
	setShowModalDetails,
	selectedContainer,
}) => {
	const tableRef = useRef();

	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: selectedContainer?.ContainerNumber,
		sheet: selectedContainer.ContainerNumber,
	});

	const handleShowDetails = (data) => {
		setSelectedProduct(data);
		setShowModalDetails(true);
	};
	return (
		<div className="overflow-x-auto container text-sx ">
			<div className="flex  flex-wrap justify-end">
				<button
					onClick={onDownload}
					type="button"
					className="flex   h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
					aria-label="Toggle dark mode"
				>
					<i className="fa fa-file-excel text-md text-green-500 "></i>
					<span className="text-xs hidden sm:block">Exportar a Excel</span>
				</button>
			</div>
			<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden h-[calc(100vh-40rem)] overflow-y-auto ">
					<table ref={tableRef} className="min-w-full text-center ">
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
