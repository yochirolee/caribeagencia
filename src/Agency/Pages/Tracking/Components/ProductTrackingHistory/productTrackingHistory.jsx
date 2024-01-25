import { React } from "react";
import { HistoryTimeLine } from "../HistoryTimeLine";
import { TimeLine } from "../TimeLine";

export const ProductTrackingHistory = ({ product }) => {
	return (
		<>
			<div className="flex flex-col  bg-white rounded-lg border px-6 justify-between text-center  mt-4 ">
				<div className="flex  items-center text-left gap-4 py-4 text-xs">
					<div className="font-semibold text-center border p-4 bg-blue-600 text-white rounded-lg">
						<p>{product?.status}</p>
					</div>
					<div className="flex flex-col">
						<p className="text-xs font-semibold ">{product?.hbl}</p> {product?.description}
						<p>{product?.weight} Lbs</p>
					</div>
				</div>
			
					<TimeLine history={product?.trackingHistory} />
				
			</div>
		</>
	);
};
