import { Card, MultiSelectBoxItem, MultiSelectBox, SelectBox, SelectBoxItem } from "@tremor/react";
import { useMemo, useState, React, useRef, useEffect } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { HBLContainerStats } from "../../Components/Stats/HBLContainerStats";
import { InvoiceContainerStats } from "../../Components/Stats/InvoicesContainerStats";
import TableReportContainerTransport from "../../Components/Tables/TableReportContainerTransport";
import { AgencySelect } from "../../Components/ui/Selects";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { ContainerTransportStats } from "../../Components/ui/Stats/ContainerTransportStats";
import { useFetchContainerReport } from "../../hooks/useReports/useFetchContainerReport";
import { formatListOfInvoices } from "../../Utils/formatListOfInvoices";
import { getUniqueAgencies } from "../../Utils/getUniqueAgencies";
import { filterProducts } from "../../Utils/filterProducts";
import { InvoicesProvincesContainerStats } from "../../Components/Stats/InvoicesProvincesContainerStats";

export const ReportContainerTransport = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const [selectedAgency, setSelectedAgency] = useState(undefined);
	const { data: productList, isLoading: isLoadingProducts } =
		useFetchContainerReport(selectedContainer);

	const invoices = useMemo(
		() => formatListOfInvoices(productList, selectedContainer),
		[productList],
	);
	const agencies = useMemo(() => getUniqueAgencies(invoices), [invoices]);

	const filteredInvoices = useMemo(
		() =>
			selectedAgency
				? invoices?.filter((invoice) => invoice.AgencyName == selectedAgency)
				: invoices,
		[selectedAgency, productList],
	);
	const filteredProducts = useMemo(
		() => filterProducts(productList, selectedAgency, ""),
		[selectedAgency, productList],
	);

	const tableRef = useRef();
	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: selectedAgency
			? selectedAgency + "-" + selectedContainer?.ContainerNumber
			: selectedContainer?.ContainerNumber,
		sheet: selectedAgency ? selectedAgency : "test",
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
					<ContainerTransportStats invoices={filteredInvoices} />

					<div className=" grid grid-cols-2">
						<div name="actions" className=" flex gap-4 items-center justify-between">
							<div>
								{selectedAgency ? (
									<span
										id="badge-dismiss-dark"
										className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
									>
										{selectedAgency}
										<button
											onClick={() => setSelectedAgency(undefined)}
											type="button"
											className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
											data-dismiss-target="#badge-dismiss-dark"
											aria-label="Remove"
										>
											<svg
												aria-hidden="true"
												className="w-3.5 h-3.5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												></path>
											</svg>
											<span className="sr-only">Remove badge</span>
										</button>
									</span>
								) : (
									""
								)}
							</div>
						</div>

						<div className="flex flex-wrap justify-end gap-2 items-center">
							<AgencySelect
								agencies={agencies}
								selectedAgency={selectedAgency}
								setSelectedAgency={setSelectedAgency}
							/>
						</div>
					</div>
					<div className="flex flex-col container items-center lg:items-start lg:justify-between lg:flex-row gap-4 lg:gap-10">
						<HBLContainerStats products={filteredProducts} />
						<InvoiceContainerStats invoicesList={filteredInvoices} />
						<InvoicesProvincesContainerStats invoicesList={filteredInvoices} />
					</div>
					<Card className="mt-6">
						<div className="flex flex-wrap justify-end">
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

						<div className="max-h-[600px]  overflow-auto">
							<TableReportContainerTransport invoices={filteredInvoices} tableRef={tableRef} />
						</div>
					</Card>
				</div>
			)}
		</div>
	);
};
