import axios from "axios";
import { React, useState } from "react";
import { Search } from "./Search";
export const ItemsTable = ({ items, setItems }) => {
	const [itemDetails, setItemDetails] = useState({});

	const getItemDetails = async (TrackingId) => {
		try {
			const { data, status } = await axios.get(
				"https://caribe-cargo-api.vercel.app/api/items/" + TrackingId,
			);
			console.log(data.data);
			setItemDetails(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="  shadow-md sm:rounded-lg">
			<Search items={items} setItems={setItems} />
			<div className="flex flex-row gap-10">
				<table className=" text-sm text-left overflow-y-auto  text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3 px-6">
								HBL
							</th>
							<th className="py-3 px-6 flex  shrink-0">Location</th>
							<th scope="col" className="py-3 px-6">
								Date
							</th>
							<th scope="col" className="py-3 px-6">
								Weight
							</th>
							<th scope="col" className="py-3 px-6">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item, index) => (
							<>
								<tr
									key={index}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{item.TrackingId}
									</th>
									<td class="py-4 px-6 ">
										<span className="border px-2 py-0.5 rounded-lg text-xs text-white bg-green-500">
											{item.Location}
										</span>
									</td>
									<td class="py-4 px-6">{item.created_at}</td>
									<td class="py-4 px-6">$2999</td>
									<td class="py-4 px-6">
										<a
											href="#"
											class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
										>
											<i
												className="fas fa-file-invoice"
												onClick={() => getItemDetails(item.TrackingId)}
											></i>
										</a>
									</td>
								</tr>
							</>
						))}
					</tbody>
				</table>
				
					<div className="w-1/3  ">
						<p className=" ">HBL: {itemDetails?.codigo_paquete}</p>
						<p className=" ">Descripcion: {itemDetails?.descripcion}</p>
						<p className=" ">
							Destinatario:{" "}
							{itemDetails?.destinatario?.name + " " + itemDetails?.destinatario?.lastName}
						</p>
					</div>
				
			</div>
		</div>
	);
};
