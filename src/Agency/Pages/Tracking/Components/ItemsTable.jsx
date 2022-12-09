
import { React } from "react";

export const ItemsTable = ({ items, getItemsDetails }) => {
	


	return (
		<div className=" h-full">
			
		

			<div className={`${items.length > 0 ? " mt-10 h-80  overflow-y-scroll text-xs" : "hidden"} `}>
				<table className="w-full">
					<thead>
						<tr className="text-left">
							<th>HBL</th>
							<th>Locacion</th>
							<th>Fecha</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{items.length ? (
							items.map((item, index) => (
								<tr
									key={index}
									className="text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<th
										scope="row"
										className="text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{item.HBL}
									</th>
									<td className=" ">
										<span className="border px-2 py-0.5 rounded-lg text-xs text-white bg-green-500">
											{item.Location}
										</span>
									</td>

									<td className="py-4 ">{item.created_at}</td>
									<td className="py-4 ">
										<i className="fa fa-file-invoice" onClick={() =>getItemsDetails(item)}></i>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td className="text-center text-sm">No Found.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
