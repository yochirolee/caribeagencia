import { format, parseISO } from "date-fns";

export const ProductsTable = ({ handleOnSelectedProduct, filteredProducts, tableRef }) => {
	if (!filteredProducts) return null;

	return (
		<div className=" grid py-2  min-w-full ">
			<div className="overflow-y-auto max-h-screen ">
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
