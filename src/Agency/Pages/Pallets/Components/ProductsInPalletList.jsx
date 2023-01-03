import { Spinner } from "flowbite-react";
import { useState } from "react";
import { React } from "react";
import { useQuery } from "react-query";
import { fetchPalletById } from "../../../Helpers/Pallets/fetchPalletById";
import { ProductModalDetails } from "../../Tracking/Components/ProductModalDetails";
export const ProductsInPalletList = ({ ProductsInPallet,isLoading }) => {
	const [selectedProduct, setSelectedProduct] = useState({});
	const [showModalDetails, setShowModalDetails] = useState(false);

	

	const handleSelectedProduct = (product) => {
		setShowModalDetails(true);
		setSelectedProduct(product);
	};

	if (isLoading)
		return (
			<div className="text-center mt-2">
				<Spinner />
			</div>
		);

	return (
		<>
			<div className="flex  gap-2 border items-center rounded-lg text-xs p-2 my-2">
				<span className="flex flex-col border-r px-2 items-center">
					<i className="fa fa-pallet text-sm text-green-500 p-1"></i>
					<span className="absolute  text-center   text-green-600 font-bold">
						{ProductsInPallet?.PalletId}
					</span>
				</span>
				<div className="flex">
					<p>Productos:</p>
					<span> {ProductsInPallet?.ProductsInPallet}</span>
				</div>

				<span className="flex p-2 gap-1">
					<p>Pallets: </p>
					<span className="">{ProductsInPallet?.PalletCount}</span>
				</span>
				<span className="flex gap-1">
					<p>Peso: </p>
					{ProductsInPallet?.PalletWeight}
				</span>
			</div>
			<div className="overflow-y-auto mt-4">
				{ProductsInPallet?.Products?.map((product, index) => (
					<div
						key={index}
						className="flex items-center cursor-pointer p-2 rounded-lg m-2 border text-xs hover:ring-1  bg-white shadow-sm"
						onClick={() => handleSelectedProduct(product)}
					>
						<div>
							<i className="fa fa-box text-lg text-blue-400 p-4"></i>
						</div>
						<div>
							<span className="text-slate-500 font-bold">{product.HBL}</span>
							<p>{product.ProductDescription}</p>
							<p>Factura: {product.InvoiceId}</p>
						</div>
					</div>
				))}
			</div>
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModalDetails}
				setShowModalDetails={setShowModalDetails}
			/>
		</>
	);
};
