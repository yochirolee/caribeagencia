import { format, parseISO } from "date-fns";
import { React, useState, useMemo, useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useSelector } from "react-redux";
import { TablePagination } from "../Pagination/TablePagination";
import TableDropDown from "../ui/Dropdowns/TableDropDown";
import AgencySelect from "../ui/Selects/AgencySelect";

const getUniqueAgencies = (productList) => {
	if (!productList) return [];

	const uniqueAgencies = [...new Set(productList.map((product) => product.Agency))];
	return uniqueAgencies;
};

export const ProductsTable = ({
	productList,
	handleOnSelectedProduct,
	selectedContainer,
	setSelectedContainer,
	setOpenContainerStops,
	filteredProducts,
	selectedAgency,
	setSelectedAgency,
}) => {
	if (!productList) return null;

	const { user } = useSelector((state) => state.Auth);
	const tableRef = useRef();

	const agencies = useMemo(() => getUniqueAgencies(productList), [productList]);

	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: selectedAgency
			? selectedAgency + "-" + selectedContainer?.ContainerNumber
			: selectedContainer?.ContainerNumber,
		sheet: selectedAgency ? selectedAgency : selectedContainer?.ContainerNumber,
	});

	return (
		<div className=" grid   min-w-full ">
			<div
				name="actions"
				className="my-4 flex flex-col sm:flex-row gap-4 items-center justify-between"
			>
				<div>
					<span className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
						<p>Total HBL: </p>
						{filteredProducts.length}
					</span>
					{selectedContainer ? (
						<span
							id="badge-dismiss-dark"
							className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
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
							className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
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
				<div className="grid gap-6 items-center justify-end">
					<div className="flex justify-end gap-6 items-center">
						<AgencySelect
							agencies={agencies}
							selectedAgency={selectedAgency}
							setSelectedAgency={setSelectedAgency}
						/>
						<div className="flex gap-4">
							<button
								onClick={onDownload}
								type="button"
								className="flex  border h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
								aria-label="Toggle dark mode"
							>
								<i className="fa fa-file-excel text-md text-green-500 "></i>
								<span className="text-xs hidden sm:block">Exportar a Excel</span>
							</button>

							<button
								onClick={() => setOpenContainerStops(true)}
								type="button"
								className="flex  border h-10 gap-4 px-2  items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
								aria-label="Toggle dark mode"
							>
								<i className="fa fa-file-invoice-dollar text-md text-green-500 "></i>
								<span className="text-xs hidden sm:block">Reporte del Contenedor</span>
							</button>
						</div>
					</div>
				</div>{" "}
			</div>

			<div className="overflow-y-auto max-h-96 ">
				<table ref={tableRef} className=" text-left min-w-full ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Factura
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								HBL
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Lugar
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Agencia
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Descripcion
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Fecha
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts?.map((product, index) => (
							<tr key={index} className="bg-white border-b">
								<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900 ">
									<span
										onClick={() => handleOnSelectedProduct(product)}
										className="hover:border  rounded-lg cursor-pointer  p-2 "
									>
										<i className="fa fa-file mx-2 text-gray-500"></i>
										{product.InvoiceId}
									</span>
								</td>
								<td className="text-xs  text-gray-900  px-6   py-4 whitespace-nowrap">
									{product?.HBL.trim()}
								</td>
								<td className="text-xs text-gray-900   mpx-6   py-4 whitespace-nowrap">
									<span className="bg-green-100 p-2 rounded-lg">
										{product?.locations?.LocationName}
									</span>
								</td>
								<td className="text-xs text-gray-900 px-6  w-64  py-4">
									<p className="inline-flex ">{product.Agency}</p>
								</td>
								<td className="text-xs text-gray-900 px-6  w-64  py-4">
									<p className="inline-flex ">{product.Description}</p>
								</td>
								<td className="text-xs text-gray-900  px-6  whitespace-nowrap">
									{product.CreatedAt ? format(parseISO(product?.CreatedAt), "MMM d h:mm a") : ""}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
