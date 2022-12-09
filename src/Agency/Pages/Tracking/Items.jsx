import React, { useState } from "react";
import { ItemsTable } from "./Components/ItemsTable";
import { Locations } from "./Components/Locations";
import { UploadModal } from "./Components/UploadModal";
import { useGetItems } from "./hooks/useGetItems";
import { LoadingSpinner } from "./Components/LoadingSpinner";

export const Items = () => {
	const { items, setItems, isLoadingItems } = useGetItems();
	const [showModal, setShowModal] = useState(false);
	const [location, setLocation] = useState("En Almacen");

	return (
		<div className="relative grid mx-2  ">
			<div className="flex flex-col gap-4 h-screen lg:gap-10 mx-2 lg:mx-10 ">
				<Locations setLocation={setLocation} setShowModal={setShowModal} />

				{isLoadingItems ? <LoadingSpinner /> : <ItemsTable items={items} setItems={setItems} />}
			</div>
			<UploadModal
				showModal={showModal}
				setShowModal={setShowModal}
				location={location}
				isLoading={isLoadingItems}
			/>
		</div>
	);
};
