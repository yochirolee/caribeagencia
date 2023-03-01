import React, { useState } from "react";
import { ExcelUploadModal } from "../../Components/Modal/ExcelUploadModal";
import { SelectLocations } from "../../Components/ui/Selects/SelectLocations";

import { ProductModalDetails } from "./Components/ProductModalDetails";

export const TrackingByProducts = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [Location, setLocation] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [showModalDetails, setShowModalDetails] = useState(false);

	return (
		<div className=" flex flex-col relative">
			<div className="flex flex-col    gap-4 h-screen lg:gap-10 mx-2 lg:mx-10 ">
				<SelectLocations setLocation={setLocation} setShowModal={setShowModal} />
			</div>
			<ExcelUploadModal
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
