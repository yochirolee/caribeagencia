import { Spinner } from "flowbite-react";
import { React } from "react";
import { useQuery } from "react-query";
import { fetchProductTrackingHistory } from "../../Helpers/Products/fetchProductTrackingHistory";
import { HistoryTimeLine } from "../HistoryTimeLine";

export const ProductTrackingHistory = ({ product }) => {
	const {
		isLoading,
		isError,
		data: productsDetails,
		error,
	} = useQuery(["product", product?.HBL], () => fetchProductTrackingHistory(product));

	if (isLoading) return <Spinner />;

	if (isError) return <div>{error.message}</div>;

	return (
		<>
			<div className="flex flex-col  justify-between text-center  mt-4 ">
				<div className="flex  items-center text-left gap-4 py-4 text-xs">
					<div className="font-semibold text-center border p-4 bg-blue-600 text-white rounded-lg">
						<p>{product?.Agency}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-xs font-semibold ">{product?.HBL}</p> {product?.Description}{" "}
						<p>{product?.Weight} Lbs</p>
					</div>
				</div>

				<div className="inline-flex">
					<HistoryTimeLine history={productsDetails} />
				</div>
			</div>
		</>
	);
};
