import { React } from "react";
export const ProductsTable = ({ products }) => {
	return (
		<div className="overflow-x-auto relative  sm:rounded-lg ">
			<div className="flex justify-end items-center py-4 bg-white dark:bg-gray-800">
				
				<label for="table-search" className="sr-only">
					Buscar
				</label>
				<div className="relative">
					<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
					<input
						type="text"
						id="table-search-users"
						className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Buscar Producto"
					></input>{" "}
				</div>
			</div>
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
						<tr className="bg-white text-xs dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
							
							<th
								scope="row"
								className="  text-gray-900  dark:text-white"
							>
								
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
									<div className={`h-2.5 w-2.5 rounded-full mr-2 ${product.isActive ? "bg-green-500":"bg-red-500"}`}></div> {product.isActive ? "Activo":"Desactivado"}
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

			{/*-- Edit Product Modal */}
			<div
				id="editUserModal"
				tabindex="-1"
				aria-hidden="true"
				className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full"
			>
				<div className="relative w-full max-w-2xl h-full md:h-auto">
					{/*-- Modal content */}
					<form action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit user</h3>
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-toggle="editUserModal"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
							</button>
						</div>

						<div className="p-6 space-y-6">
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label
										for="first-name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										First Name
									</label>
									<input
										type="text"
										name="first-name"
										id="first-name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Bonnie"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="last-name"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Last Name
									</label>
									<input
										type="text"
										name="last-name"
										id="last-name"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Green"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="example@company.com"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="phone-number"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Phone Number
									</label>
									<input
										type="number"
										name="phone-number"
										id="phone-number"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="e.g. +(12)3456 789"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="department"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Department
									</label>
									<input
										type="text"
										name="department"
										id="department"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Development"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="company"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Company
									</label>
									<input
										type="number"
										name="company"
										id="company"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="123456"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="current-password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Current Password
									</label>
									<input
										type="password"
										name="current-password"
										id="current-password"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="••••••••"
										required=""
									/>
								</div>
								<div className="col-span-6 sm:col-span-3">
									<label
										for="new-password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										New Password
									</label>
									<input
										type="password"
										name="new-password"
										id="new-password"
										className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="••••••••"
										required=""
									/>
								</div>
							</div>
						</div>
						<div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Save all
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
