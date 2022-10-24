import { React } from "react";

export const ProductsTable = ({ products }) => {
	return (
		<div className="col-start-3 col-end-10">
			<div className="overflow-x-auto relative">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6">
								Producto
							</th>
							<th scope="col" className="py-3 px-6">
								Peso
							</th>
							<th scope="col" className="py-3 px-6">
								Precio
							</th>
							<th scope="col" className="py-3 px-6">
								Tarifa
							</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product) => (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{product.ProductName}
								</th>
								<td className="py-4 px-6  ">
									<small className=" text-center rounded-lg px-2 text-white ring ring-green-300 font-bold bg-green-500">
										{product.Weight}
									</small>
								</td>
								<td className="py-4 px-6"> {product.UnitPrice.toFixed(2)}</td>
								<td className="py-4 px-6">{product.PricePerPound.toFixed(2)}</td>
								<td className="py-4 px-6 space-x-3">
									<i className="fas fa-edit hover:text-green-400"></i>
									<i className="fas fa-trash hover:text-red-400"></i>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
