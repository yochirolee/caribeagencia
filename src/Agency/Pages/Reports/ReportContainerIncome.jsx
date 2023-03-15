import { React, useMemo } from "react";
import { useState } from "react";
import { ProductModalDetails } from "../../Components/Modal/ProductModalDetails";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { HBLContainerStats } from "../../Components/Stats/HBLContainerStats";
import { InvoiceContainerStats } from "../../Components/Stats/InvoicesContainerStats";
import { InvoicesProvincesContainerStats } from "../../Components/Stats/InvoicesProvincesContainerStats";
import { ReportInvoicesTable } from "../../Components/Tables/ReportInvoicesTable";
import { ReportProductsTable } from "../../Components/Tables/ReportProductsTable";
import { TableContainerIncome } from "../../Components/Tables/TableContainerIncome";
import { AgencySelect } from "../../Components/ui/Selects";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { ReportContainerStats } from "../../Components/ui/Stats/ReportContainerStats";
import { useFetchContainerReport } from "../../hooks/useReports/useFetchContainerReport";
import { filterProducts, getUniqueAgencies } from "../../Utils";

import { GroupBy } from "../../Utils/GroupBy";

export const ReportContainerIncome = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const [selectedProduct, setSelectedProduct] = useState(undefined);
	const [selectedAgency, setSelectedAgency] = useState(undefined);
	const [showModalDetails, setShowModalDetails] = useState(false);

	const {
		data: productList,
		isError: isErrorFetchingContainer,
		isLoading: isLoadingContainer,
	} = useFetchContainerReport(selectedContainer);

	const filteredProducts = useMemo(
		() => filterProducts(productList, selectedAgency),
		[productList, selectedAgency],
	);

	const agencies = useMemo(() => getUniqueAgencies(productList), [productList]);

	return (
		<div className=" px-4 mx-2 relative">
			<h1>Reporte de Facturacion por Contenedor</h1>
			<ContainerSelect
				selectedContainer={selectedContainer}
				setSelectedContainer={setSelectedContainer}
			/>
			{!selectedContainer ? (
				""
			) : isLoadingContainer ? (
				<SearchResultSkeleton />
			) : (
				<div className="  flex flex-wrap  container justify-between  items-center gap-6">
					<div className=" grid container  ">
						<div className="flex  flex-wrap justify-end">
							<button
								type="button"
								className="flex   h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
								aria-label="Toggle dark mode"
							>
								<i className="fa fa-file-excel text-md text-green-500 "></i>
								<span className="text-xs hidden sm:block">Exportar a Excel</span>
							</button>
						</div>
						<div className=" grid grid-cols-2">
							<div name="actions" className=" flex gap-4 items-center justify-between">
								<div>
									<span className="inline-flex gap-2  items-center px-2 py-1 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
										<p>Total HBL: </p>
										{filteredProducts?.length ? filteredProducts?.length : 0}
									</span>
									{selectedContainer ? (
										<span
											id="badge-dismiss-dark"
											className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
										>
											{selectedContainer?.ContainerNumber}
											<button
												onClick={() => setSelectedContainer(undefined)}
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
							{selectedContainer.ContainerId}
						</div>
						<ReportContainerStats
							filteredProducts={filteredProducts}
							selectedAgency={selectedAgency}
						/>
						<div className="flex flex-wrap gap-4 justify-between px-2">
							<HBLContainerStats filteredProducts={filteredProducts} />
							<InvoiceContainerStats filteredProducts={filteredProducts} />
							<InvoicesProvincesContainerStats filteredProducts={filteredProducts} />
						</div>
					</div>
					<ReportInvoicesTable containerData={filteredProducts} />
					<ReportProductsTable
						containerData={filteredProducts}
						setSelectedProduct={setSelectedProduct}
						setShowModalDetails={setShowModalDetails}
					/>
					{/*  <TableContainerIncome containerData={filteredProducts} />*/}
				</div>
			)}
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModalDetails}
				setShowModalDetails={setShowModalDetails}
			/>
		</div>
	);
};
