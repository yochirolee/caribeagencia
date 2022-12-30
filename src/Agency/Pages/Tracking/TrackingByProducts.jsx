import React, { useState } from "react";
import { ProductsTrackingList } from "./Components/ProductsTrackingList";
import { Locations } from "./Components/Locations";
import { UploadModal } from "./Components/UploadModal";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import { Search } from "./Components/Search";
import { ProductModalDetails } from "./Components/ProductModalDetails";
import { useQuery } from "react-query";
import { fetchTrackingProductHistory } from "./Helpers/Products/fetchProductList";

export const TrackingByProducts = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [findProduct, setFindProduct] = useState(" ");

	const {
		isLoading: isLoadingProducts,
		isError,
		data: productList,
		error,
	} = useQuery(["getProducts", findProduct], () => fetchTrackingProductHistory(findProduct), {
		enabled: Boolean(findProduct) 
	});

	const handleSelectedProduct = (product) => {
		setSelectedProduct(product);
		setShowModalDetails(true);
	};

	const [showModal, setShowModal] = useState(false);
	const [Location, setLocation] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [showModalDetails, setShowModalDetails] = useState(false);

	return (
		<div className=" flex flex-col">
			<div className="flex flex-col  gap-4 h-screen lg:gap-10 mx-2 lg:mx-10 ">
				<Locations setLocation={setLocation} setShowModal={setShowModal} />
				<Search isLoading={isLoading} setFindProduct={setFindProduct} />
				{isLoadingProducts ? (
					<LoadingSpinner />
				) : (
					<ProductsTrackingList
						productList={productList}
						handleSelectedProduct={handleSelectedProduct}
					/>
				)}
			</div>
			<UploadModal
				showModal={showModal}
				setShowModal={setShowModal}
				Location={Location}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
			/>
			<ProductModalDetails
				selectedProduct={selectedProduct}
				showModalDetails={showModalDetails}
				setShowModalDetails={setShowModalDetails}
			/>
		</div>
	);
};
