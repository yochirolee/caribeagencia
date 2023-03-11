import { React, useState, useMemo, useEffect, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { SearchResult } from "../../Components/Search/searchResult";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { DashboardStats } from "../../Components/Stats/DashboardStats";
import { ProductsTable } from "../../Components/Tables/ProductsTable";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import { AgencySelect, ContainerSelect, LocationSelect } from "../../Components/ui/Selects";
import { filterProducts, getUniqueAgencies, getUniqueLocations } from "../../Utils";
import { useFetchAllProductsByContainerId } from "../../hooks/useContainers/useFecthAllProductsByContainerId";
import { useFetchByInvoiceOrHBL } from "../../hooks/useFetchByInvoiceOrHBL";
import { ProductModalDetails } from "../../Components/Modal/ProductModalDetails";
import { ExcelUploadModal } from "../../Components/Modal/ExcelUploadModal";

export const Dashboard = () => {
	const [search, setSearch] = useState(undefined);
	const { data: searchResult, isLoadingSearch } = useFetchByInvoiceOrHBL(search);
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const [selectedAgency, setSelectedAgency] = useState(undefined);
	const [selectedLocation, setSelectedLocation] = useState(undefined);

	const { data: productList, isLoading: isLoadingContainerData } = useFetchAllProductsByContainerId(
		selectedContainer?.ContainerId,
	);

	const filteredProducts = useMemo(
		() => filterProducts(productList, selectedAgency, selectedLocation),
		[productList, selectedAgency, selectedLocation],
	);
	useEffect(() => {
		setSearch(undefined);
	}, [selectedContainer]);

	const agencies = useMemo(() => getUniqueAgencies(productList), [productList]);
	const locations = useMemo(() => getUniqueLocations(productList), [productList]);

	const tableRef = useRef();

	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: selectedAgency
			? selectedAgency + "-" + selectedContainer?.ContainerNumber
			: selectedContainer?.ContainerNumber,
		sheet: selectedAgency ? selectedAgency : selectedContainer?.ContainerNumber,
	});

	const [showModal, setShowModal] = useState(false);
	const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});

	const handleOnSelectedProduct = (HBL) => {
		setSelectedProduct(HBL);
		setShowModal(true);
	};

	const handleSearch = (e) => {
		setSearch(e);
	};

	return (
		<div className="flex flex-col min-h-screen  relative   ">
			<div className="container p-2">
				<div className="flex  flex-wrap justify-end">
					<button
						onClick={() => setShowExcelUploadModal(true)}
						type="button"
						className="flex   h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
						aria-label="Toggle dark mode"
					>
						<i className="fa fa-file-excel text-md text-green-500 "></i>
						<span className="text-xs hidden sm:block">Importar desde Excel</span>
					</button>
				</div>
				<div className="bg-gray-50  p-4 rounded-lg">
					<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
				</div>
				{isLoadingSearch ? (
					<SearchResultSkeleton />
				) : (
					<SearchResult selectedProductDetails={searchResult} setSearch={setSearch} />
				)}

				<div className="p-2   mt-4  ">
					<div className="  flex flex-wrap container justify-between  items-center gap-6">
						<div className=" grid container  ">
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
										{selectedLocation ? (
											<span
												id="badge-dismiss-dark"
												className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
											>
												{selectedLocation}
												<button
													onClick={() => setSelectedLocation(undefined)}
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
									<ContainerSelect
										selectedContainer={selectedContainer}
										setSelectedContainer={setSelectedContainer}
										setSearch={setSearch}
										showCaption={false}
									/>
									<AgencySelect
										agencies={agencies}
										selectedAgency={selectedAgency}
										setSelectedAgency={setSelectedAgency}
									/>
									<LocationSelect
										locations={locations}
										setSelectedLocation={setSelectedLocation}
										selectedLocation={selectedLocation}
									/>
								</div>
							</div>
						</div>
						<div className="mt-2 flex justify-center flex-wrap bg-gray-50 w-full ">
							{isLoadingContainerData ? (
								<SearchResultSkeleton />
							) : (
								<DashboardStats filteredProducts={filteredProducts} />
							)}
						</div>
						{isLoadingContainerData ? (
							<SearchResultSkeleton />
						) : (
							<ProductsTable
								filteredProducts={filteredProducts}
								handleOnSelectedProduct={handleOnSelectedProduct}
								tableRef={tableRef}
							/>
						)}
					</div>
				</div>
			</div>
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModal}
				setShowModalDetails={setShowModal}
			/>
			<ExcelUploadModal showModal={showExcelUploadModal} setShowModal={setShowExcelUploadModal} />
		</div>
	);
};
