import { React } from "react";

export const ProductsTable = ({ products }) => {

	
	return (
		<div className="overflow-x-auto relative  sm:rounded-lg ">
			
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">
							Nombre
						</th>
						<th scope="col" className="py-3 px-6">
							Descripcion
						</th>
						<th scope="col" className="py-3 px-6">
							Precio
						</th>
						<th scope="col" className="py-3 px-6">
							Costo
						</th>
						<th scope="col" className="py-3 px-6">
							Peso
						</th>
						<th scope="col" className="py-3 px-6">
							Estado
						</th>
						<th scope="col" className="py-3 px-6">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{products?.map((product) => (
						<tr key={product.id} className="bg-white text-xs dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
							<th scope="row" className="  text-gray-900  dark:text-white">
								<div className="pl-3">
									<div className="">{product.product_name}</div>
									<div className="font-normal text-gray-500">{product.product_type}</div>
								</div>
							</th>
							<td className="py-4 px-6">{product.product_description}</td>
							<td className="py-4 px-6">{product.product_price}</td>
							<td className="py-4 px-6">{product.product_cost}</td>
							<td className="py-4 px-6">{product.product_weight}</td>
							<td className="py-4 px-6">
								<div className="flex items-center">
									<div
										className={`h-2.5 w-2.5 rounded-full mr-2 ${
											product.isActive ? "bg-green-500" : "bg-red-500"
										}`}
									></div>{" "}
									{product.isActive ? "Activo" : "Desactivado"}
								</div>
							</td>
							<td className="py-4 px-6 flex ">
								<i className="fas fa-edit mx-4"></i>
								<i className="fas fa-trash"></i>
							</td>
						</tr>
					))}
				</tbody>
			</table>

		
			
		</div>
	);
};
