import { React, useState } from "react";
import { FillContainer } from "../Pallets/Components/FillContainer";
import { ListProductsInPallet } from "../Pallets/Components/ListProductsInPallet";
import { PalletDetails } from "../Pallets/Components/PalletDetails";
import PalletSelect from "../Pallets/Components/PalletSelect";
export const CreateContainer = () => {
	const [selectedPallet, setSelectedPallet] = useState({});
	return (
		<div className="flex   ">
			<aside
				className="lg:w-1/3  flex flex-col  border-r p-4 lg:h-screen  bg-gray-50"
				aria-label="Sidebar"
			>
				<PalletSelect selectedPallet={selectedPallet} setSelectedPallet={setSelectedPallet} />
				<PalletDetails selectedPallet={selectedPallet} />
				<ListProductsInPallet selectedPallet={selectedPallet} />
			</aside>
			<div className="  px-4 container ">
				<FillContainer selectedPallet={selectedPallet} />
			</div>
		</div>
	);
};
