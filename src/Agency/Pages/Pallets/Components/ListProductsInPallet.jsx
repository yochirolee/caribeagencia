import { Spinner } from "flowbite-react";
import { useState } from "react";
import { React } from "react";
import { useFetchProductsByPalletId } from "../../../hooks/useFetchProductsByPalletId";
import { ProductModalDetails } from "../../Tracking/Components/ProductModalDetails";


export const ListProductsInPallet = ({ selectedPallet }) => {

	const [selectedProduct, setSelectedProduct] = useState({});
	const [showModalDetails, setShowModalDetails] = useState(false);
	const {
		isLoading,
		isError: isErrorProduct,
		data: ProductsInPallet,
		error: errorProduct,
	} = useFetchProductsByPalletId(selectedPallet.PalletId);


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
			
			<div className="overflow-y-auto mt-4   ">
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
