import { React } from "react";
import { useQuery } from "react-query";
import { fetchProductTrackingHistory } from "../../Helpers/Products/fetchProductTrackingHistory";
import { HistoryTimeLine } from "../HistoryTimeLine";


export const HBLDetails = ({ product }) => {
	const {
		isLoading,
		isError,
		data: productsDetails,
		error,
	} = useQuery(["product", product.HBL], () => fetchProductTrackingHistory(product));

	if (isLoading)
		return (
			<div className="mt-5">
				<div role="status" class="animate-pulse">
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
					<div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
					<div className="flex justify-center items-center mt-4">
						<svg
							className="mr-2 w-10 h-10 text-gray-200 dark:text-gray-700"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
								clipRule="evenodd"
							></path>
						</svg>
						<div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
						<div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
					</div>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	if (isError) return <div>{error.message}</div>;

	return (
		<>
			<div
			
				className="flex flex-col  justify-between text-center  my-2 p-4"
			>
				<div className="flex products-center items-center text-left gap-4 py-4 text-xs">
					<p className="font-semibold border p-4 bg-blue-600 text-white rounded-lg">
						{productsDetails[0].Location}
					</p>
					<p className="text-xs font-semibold">{product.HBL}</p>
				
					<p>{product.Description}</p>
				</div>
				<div className="inline-flex">
					<HistoryTimeLine history={productsDetails} />
				</div>
			</div>
		</>
	);
};
