import { React, useDeferredValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks_getCustomersPaginated } from "../../Store/Slices/Customers/thunks";
import { TableSkeleton } from "../Products/Skeleton/TableSkeleton";
export const Customers = () => {
	const dispatch = useDispatch();
	const { customers, isLoading } = useSelector((state) => state.CustomersSlice);

	useEffect(() => {
		dispatch(thunks_getCustomersPaginated());
	}, []);

	return (
		<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
			<div className="flex justify-between items-center pb-4">
				<div></div>
				<label for="table-search" className="sr-only">
					Search
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
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							></path>
						</svg>
					</div>
					<input
						type="text"
						id="table-search"
						className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search for items"
					/>
				</div>
			</div>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="py-3 px-6">
							Nombre
						</th>
						<th scope="col" className="py-3 px-6">
							Celular
						</th>
						<th scope="col" className="py-3 px-6">
							Agencia
						</th>
						<th scope="col" className="py-3 px-6">
							Direccion
						</th>
						<th scope="col" className="py-3 px-6">
							Documento
						</th>
						<th scope="col" className="py-3 px-6">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<TableSkeleton />
					) : (
						<>
							{customers.map((customer) => (
								<tr
									key={customer.id}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{customer.name + " " + customer.last_name}
									</th>
									<td className="py-4 px-6">{customer.cellphone}</td>
									<td className="py-4 px-6">{customer.agency_id}</td>
									<td className="py-4 px-6">{customer.address}</td>
									<td className="py-4 px-6">{customer.document}</td>
									<td className="py-4 px-6 ">
										<div className="flex space-x-4">
											<i className="fas fa-edit text-green-500"></i>
											<i className="fas fa-trash text-red-400"></i>
										</div>
									</td>
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>

			<nav className="flex justify-between items-center pt-4" aria-label="Table navigation">
				<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
					Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of{" "}
					<span className="font-semibold text-gray-900 dark:text-white">1000</span>
				</span>
				<ul className="inline-flex items-center -space-x-px">
					<li>
						<a
							href="#"
							className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<span className="sr-only">Previous</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							aria-current="page"
							className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
						>
							3
						</a>
					</li>
					<li>
						<a
							href="#"
							className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							...
						</a>
					</li>
					<li>
						<a
							href="#"
							className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							100
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<span className="sr-only">Next</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};
