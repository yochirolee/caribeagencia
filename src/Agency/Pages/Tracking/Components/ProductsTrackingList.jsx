import { React } from "react";

export const ProductsTrackingList = ({ productList, handleSelectedProduct }) => {
	return (
		<div className=" h-full ">
			<div
				className={`${productList?.length > 0 ? "  h-1/2  overflow-y-scroll text-xs" : "hidden"} `}
			>
				<table className="w-full">
					<thead>
						<tr className="text-left">
							<th></th>
							<th>HBL</th>
							<th>Locacion</th>
						</tr>
					</thead>
					<tbody>
						{productList?.length ? (
							productList.map((product, index) => (
								<tr
									key={index}
									className="text-left bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<td className="p-3 ">
										<i
											className="fa fa-file-invoice text-blue-500 text-base hover:text-blue-400"
											onClick={() => handleSelectedProduct(product)}
										></i>
									</td>
									<td
										scope="row"
										className="text-left font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{product?.HBL}
									</td>
									<td className=" ">
										<span className="rounded my-6 p-2 border bg-green-500 border-green-500 text-white ">
											{product?.LocationId}
										</span>
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
