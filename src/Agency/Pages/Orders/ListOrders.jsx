import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_getOrders } from "../../Store/Slices/Orders/OrdersActions";
export const ListOrders = () => {
	const { orders } = useSelector((state) => state.OrdersSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(action_getOrders());
	}, []);
	return (
		<>
			<div className=" flex flex-col   gap-10">
				<div className=" bg-white dark:bg-gray-900">
					<label htmlFor="table-search" className="sr-only">
						Buscar por Numero de Orden
					</label>
					<div className="relative mt-1">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<i className="fa fa-search"></i>
						</div>
						<input
							type="text"
							id="table-search"
							className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Buscar Orden"
						/>
					</div>
				</div>
				<div className="col-start-3 col-end-10">
					<div className="overflow-x-auto relative">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="py-3 px-6">
										No. Orden
									</th>
									<th scope="col" className="py-3 px-6">
										Items
									</th>
									<th scope="col" className="py-3 px-6">
										Cliente
									</th>
									<th scope="col" className="py-3 px-6">
										Destinatario
									</th>
									<th scope="col" className="py-3 px-6">
										Fecha
									</th>
								</tr>
							</thead>
							<tbody>
								{orders?.map((order) => (
									<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{order.OrderId}
										</th>
										<td className="py-4 px-6  ">
											<small className=" text-center rounded-lg px-2 text-white ring ring-green-300 font-bold bg-green-500">
												{order.productsInOrders.length}
											</small>
										</td>
										<td className="py-4 px-6">
											{order.customers?.FirstName + " " + order.customers?.LastName}
										</td>
										<td className="py-4 px-6">
											{order.recievers?.FirstName + " " + order.recievers?.LastName}
										</td>
										<td className="py-4 px-6">{order.CreatedAt}</td>
										<td className="py-4 px-6 space-x-3">
											<i className="fas fa-file hover:text-yellow-400"></i>
											<i className="fas fa-edit hover:text-green-400"></i>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};
