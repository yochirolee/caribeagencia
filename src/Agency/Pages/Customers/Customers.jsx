import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_getCustomers } from "../../Store/Slices/Customers/CustomersActions";
import { TableSkeleton } from "../Products/Skeleton/TableSkeleton";
export const Customers = () => {
	const dispatch = useDispatch();
	const { customers, isLoading } = useSelector((state) => state.CustomersSlice);

	useEffect(() => {
		dispatch(action_getCustomers());
	}, []);

	return (
		<div >
			{isLoading ? (
				<TableSkeleton />
			) : (
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6">
								Nombre
							</th>
							<th scope="col" className="py-3 px-6">
								Movil
							</th>

							<th scope="col" className="py-3 px-6">
								Direccion
							</th>
							<th scope="col" className="py-3 px-6">
								Correo
							</th>
						</tr>
					</thead>
					<tbody>
						{customers?.map((customer) => (
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<th
									scope="row"
									className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{customer.FirstName + " " + customer.LastName}
								</th>
								<td className="py-4 px-6  ">
									<small className=" text-center rounded-lg px-2 text-white ring ring-green-300 font-bold bg-green-500">
										{customer.Mobile}
									</small>
								</td>

								<td className="py-4 px-6"> {customer.Address}</td>
								<td className="py-4 px-6">{customer.Email}</td>
								<td className="py-4 px-6 space-x-3">
									<i className="fas fa-edit hover:text-green-400"></i>
									<i className="fas fa-trash hover:text-red-400"></i>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};
