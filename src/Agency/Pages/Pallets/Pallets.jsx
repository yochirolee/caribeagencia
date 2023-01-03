import { Spinner } from "flowbite-react";
import { React, useState } from "react";
import { useQuery } from "react-query";
import { fetchPalletById } from "../../Helpers/Pallets/fetchPalletById";
import { fetchPallets } from "../../Helpers/Pallets/fetchPallets";
import { FillContainer } from "./Components/FillContainer";
import PalletSelect from "./Components/PalletSelect";
import { ProductsInPalletList } from "./Components/ProductsInPalletList";

export const Pallets = () => {
	const [selectedPallet, setSelectedPallet] = useState({});
	const {
		isLoading: isLoading,
		isError,
		data: Pallets,
		error,
	} = useQuery("getPallets", () => fetchPallets());
	const {
		isLoading: isLoadingProducts,
		isError: isErrorProduct,
		data: ProductsInPallet,
		error: errorProduct,
	} = useQuery(
		["getProductsInPallet", selectedPallet.PalletId],
		() => fetchPalletById(selectedPallet.PalletId),
		{ enabled: Boolean(selectedPallet.PalletId) },
	);

	if (isLoading) return <Spinner />;
	return (
		<div className="flex">
			<aside
				className="col-span-3  flex flex-col  border-r p-4 lg:h-screen  bg-gray-50"
				aria-label="Sidebar"
			>
				<PalletSelect
					pallets={Pallets.data}
					selectedPallet={selectedPallet}
					setSelectedPallet={setSelectedPallet}
				/>
				<ProductsInPalletList ProductsInPallet={ProductsInPallet} isLoading={isLoadingProducts} />
			</aside>
			<div className="  px-4 container">
				<FillContainer selectedPallet={selectedPallet} ProductsInPallet={ProductsInPallet} />
			</div>
		</div>
	);
};
