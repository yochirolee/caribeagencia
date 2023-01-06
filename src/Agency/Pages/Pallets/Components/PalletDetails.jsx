import { React } from "react";
export const PalletDetails = ({ selectedPallet }) => {
	return (
		<div className="flex justify-center mt-2 gap-4 text-xs p-1 ">
			<div className="flex  flex-col lg:flex-row h-10 items-center  space-x-1   bg-yellow-400 text-white text-center p-1 border rounded-lg">
				<span className="h-6 w-auto  bg-gray-50/30 justify-center flex items-center  p-2 rounded-lg ">
					<p className="text-white  font-bold text-sm">
						{selectedPallet?.ProductsInPallet ? selectedPallet.ProductsInPallet : 0}
					</p>
				</span>
				<p>Productos en Pallet</p>
			</div>
			<div className="flex items-center  space-x-1   bg-green-500 text-white text-center px-1 border rounded-lg">
				<span className="h-6  w-auto  bg-gray-50/30 justify-center flex items-center  p-2 rounded-lg ">
					<p className="text-white  font-bold text-sm">
						{selectedPallet?.PalletWeight ? selectedPallet.PalletWeight : 0}
					</p>
				</span>
				<p>Peso del Pallet</p>
			</div>
		</div>
	);
};
