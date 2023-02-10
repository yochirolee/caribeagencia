import { format, parseISO } from "date-fns";
import { React } from "react";
import { TablePagination } from "../Pagination/TablePagination";
import TableDropDown from "../ui/Dropdowns/TableDropDown";
export const TableUngroupedProducts = ({ productList, handleOnSelectedProduct }) => {
	return (
		<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden h-[calc(100vh-21rem)] overflow-y-auto ">
					<table className="min-w-full text-center ">
						<thead className="border-b bg-gray-50">
							<tr>
								<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
									Factura
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
									HBL
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
									Descripcion
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
									Fecha de Desagrupe
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
									Estado
								</th>
								<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
									Estado
								</th>
							</tr>
						</thead>
						<tbody>
							{productList?.map((product, index) => (
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
									<td className="text-xm  text-gray-900 font-light px-6   py-4 whitespace-nowrap">
										{product?.HBL.trim()}
									</td>
									<td className="text-xm text-gray-900 font-light px-6  w-64  py-4">
										<p className="inline-flex ">{product.Description}</p>
									</td>
									<td className="text-xm text-gray-900 font-light px-6  whitespace-nowrap">
										{product.CreatedAt ? format(parseISO(product?.CreatedAt), "MMM d h:mm a") : ""}
									</td>
									<td className="text-xm text-gray-900 font-light mpx-6   py-4 whitespace-nowrap">
										{product?.StatusId == 3 ? (
											<div className="flex flex-col px-6  text-center">
												<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
													<span className="bg-red-100 text-red-700 rounded p-1">
														No Manifestado
													</span>
												</p>
											</div>
										) : (
											<div className="flex flex-col px-6  text-center">
												<p className="text-[11px] grow-0 text-zinc-600  p-1 ">
													<span className="bg-green-100 text-green-700 rounded p-1">Correcto</span>
												</p>
											</div>
										)}
									</td>
									<TableDropDown />
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<TablePagination />
			</div>
		</div>
	);
};
