import { React, useState } from "react";
import { FillContainer } from "./Components/FillContainer";
import { PalletDetails } from "./Components/PalletDetails";
import PalletSelect from "./Components/PalletSelect";
import { ListProductsInPallet } from "./Components/ListProductsInPallet";

export const Pallets = () => {
	const [selectedPallet, setSelectedPallet] = useState({});

	
	return (
		<div className="flex">
			<aside
				className="lg:w-1/3  flex flex-col  border-r p-4 lg:h-screen  bg-gray-50"
				aria-label="Sidebar"
			>
				<PalletSelect selectedPallet={selectedPallet} setSelectedPallet={setSelectedPallet} />
				<PalletDetails selectedPallet={selectedPallet} />
				<ListProductsInPallet selectedPallet={selectedPallet} />
			</aside>
			<div className="  px-4 container">
				<FillContainer selectedPallet={selectedPallet} />
			</div>
		</div>
	);
};
