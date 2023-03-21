import {
	SelectBox,
	SelectBoxItem,
} from "@tremor/react";
import { useMemo, useState, React, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { HBLContainerStats } from "../../Components/Stats/HBLContainerStats";
import { InvoiceContainerStats } from "../../Components/Stats/InvoicesContainerStats";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { ContainerTransportStats } from "../../Components/ui/Stats/ContainerTransportStats";
import { useFetchContainerReport } from "../../hooks/useReports/useFetchContainerReport";
import { formatListOfInvoices } from "../../Utils/formatListOfInvoices";

export const ReportContainerTransport = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);

	const {
		data: productList,
		isLoading: isLoadingProducts,
	} = useFetchContainerReport(selectedContainer);

	const { finalFormattedInvoices, amountToPayForDelivery } = useMemo(
		() => formatListOfInvoices(productList, selectedContainer),
		[productList],
	);

	const tableRef = useRef();

	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: selectedContainer?.ContainerNumber,
		sheet: selectedContainer?.ContainerNumber,
	});

	return (
		<div className="p-4 m-4 ">
			<h1>Reporte de Transportacion por Contenedores</h1>
			<ContainerSelect
				selectedContainer={selectedContainer}
				setSelectedContainer={setSelectedContainer}
			/>
			{!selectedContainer ? (
				""
			) : isLoadingProducts ? (
				<SearchResultSkeleton />
			) : (
				<div className=" text-xs ">
					<ContainerTransportStats
						products={finalFormattedInvoices}
						amountToPayForDelivery={amountToPayForDelivery}
					/>
					<div className="flex flex-col lg:flex-row gap-4 lg:gap-10  justify-center">
						<HBLContainerStats products={productList} />
						<InvoiceContainerStats invoicesList={finalFormattedInvoices} />
					</div>
					<div className="flex justify-end py-4  min-w-full sm:px-6 lg:px-8">
						<button
							onClick={onDownload}
							type="button"
							className="flex h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
							aria-label="Toggle dark mode"
						>
							<i className="fa fa-file-excel text-md text-green-500 "></i>
							<span className="text-xs hidden sm:block">Exportar a Excel</span>
						</button>
					</div>
					<div className="container  h-[calc(100vh-21rem)] overflow-x-auto ">
						<table ref={tableRef} className="min-w-full text-center ">
							<thead className="border-b bg-gray-50">
								<tr>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Factura
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Contenedor
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Total HBL
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										HBLs
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Destinatario
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Direccion Destinatario
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Telefonos Destinatario
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Con Entrega
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										<SelectBox
											onValueChange={(value) => console.log("the new value is", value)}
											defaultValue="1"
										>
											<SelectBoxItem value="1" text="Kilometers" />
											<SelectBoxItem value="2" text="Meters" />
										</SelectBox>
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Municipio
									</th>

									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Descuento
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Peso de Factura
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Pagar Manipulacion
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Pagar Entrega
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Pagar SobrePeso
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										SubTotal Entrega
									</th>
								</tr>
							</thead>
							<tbody>
								{finalFormattedInvoices?.map((invoice, index) => (
									<tr key={index} className="bg-white border-b">
										<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
											{invoice.InvoiceId}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{invoice.ContainerNumber}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{invoice.Products.length}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											<span>{invoice?.Products[0]?.HBL}</span>
										</td>

										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{invoice.RecieverName}
										</td>
										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{invoice.RecieverAddress}
										</td>
										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{invoice.Phones}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{invoice.HasDelivery ? "Si" : "No"}
										</td>
										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{invoice.Provincia}
										</td>
										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{invoice.Municipio}
										</td>

										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{parseFloat(invoice.Discount).toFixed(2)}
										</td>

										<td className="text-xs text-gray-900 text-left font-light px-6 py-4 whitespace-nowrap">
											{parseFloat(invoice.TotalWeight).toFixed(2)}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{invoice.DeliveryByHandling}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{invoice.DeliveryByLocation}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{parseFloat(invoice.DeliveryByOverWeight).toFixed(2)}
										</td>
										<td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{parseFloat(
												invoice.DeliveryByLocation +
													invoice.DeliveryByOverWeight +
													invoice.DeliveryByHandling,
											).toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};
