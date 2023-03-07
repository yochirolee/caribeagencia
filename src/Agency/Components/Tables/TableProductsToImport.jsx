import { React, useState, useMemo } from "react";
import { getUniqueAgencies } from "../../Lib";

import AgencySelect from "../ui/Selects/AgencySelect";

export const TableImportProducts = ({ productList }) => {
	if (!productList || productList == 0) return null;

	const agencies = useMemo(() => getUniqueAgencies(productList), [productList]);

	const [selectedAgency, setSelectedAgency] = useState(undefined);

	const filteredProducts = useMemo(
		() =>
			selectedAgency
				? productList?.filter((product) => product.Agency == selectedAgency)
				: productList,
		[productList, selectedAgency],
	);

	return (
		<div className="">
			<div name="actions" className="my-4  flex gap-6 items-center justify-between">
				<div>
					{selectedAgency ? (
						<span
							id="badge-dismiss-dark"
							class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
						>
							{selectedAgency}
							<button
								onClick={() => setSelectedAgency(undefined)}
								type="button"
								class="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
								data-dismiss-target="#badge-dismiss-dark"
								aria-label="Remove"
							>
								<svg
									aria-hidden="true"
									class="w-3.5 h-3.5"
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
								<span class="sr-only">Remove badge</span>
							</button>
						</span>
					) : (
						""
					)}

					<span
						id="badge-dismiss-dark"
						className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
					>
						{filteredProducts?.length} Productos
					</span>
				</div>
				<div className="grid gap-6 items-center justify-end">
					<div className="flex justify-end gap-6 items-center">
						<AgencySelect
							agencies={agencies}
							selectedAgency={selectedAgency}
							setSelectedAgency={setSelectedAgency}
						/>
					</div>
				</div>
			</div>
			<div className="grid max-h-96  overflow-auto ">
				<table className=" text-left min-w-full ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Factura
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								HBL
							</th>
							
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Agencia
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
								Descripcion
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
								
								<td className="text-xs text-gray-900 px-6  w-64  py-4">
									<p className="inline-flex ">{product.Agency}</p>
								</td>
								<td className="text-xs text-gray-900 px-6  w-64  py-4">
									<p className="inline-flex ">{product.Description}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
