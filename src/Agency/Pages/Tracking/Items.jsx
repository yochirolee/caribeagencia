import React, { useState } from "react";
import axios from "axios";
import { ItemsTable } from "./Components/ItemsTable";
import { Locations } from "./Components/Locations";
import { UploadModal } from "./Components/UploadModal";
import { useGetItems } from "./hooks/useGetItems";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import { Search } from "./Components/Search";
import { ItemsDetailsModal } from "./Components/ItemsDetailsModal";
import { supabase } from "../../../Supabase/SupabaseClient";

export const Items = () => {
	const { items, setItems, isLoadingItems } = useGetItems();
	const [showModal, setShowModal] = useState(false);
	const [location, setLocation] = useState("En Almacen");

	const [itemDetails, setItemDetails] = useState({});
	const [showModalDetails, setShowModalDetails] = useState(false);
	const [isLoadingDetails, setIsLoadingDetails] = useState(false);

	const getInvoiceDetails = async (InvoiceId) => {
		try {
			const { data, status } = await axios.get(
				"https://caribe-cargo-api.vercel.app/api/invoices/" + InvoiceId,
			);
			console.log(data.data);
			setItemDetails(data.data);
			setIsLoadingDetails(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getItemDetails = async (item) => {
		setShowModalDetails(true);
		setIsLoadingDetails(true);
		let { data: tracking, error } = await supabase
			.from("tracking")
			.select(
				`
		*,
		trackingHistory (
		 *
		)`,
			)
			.order("CreatedAt", { foreignTable: "trackingHistory", ascending: false })
			.eq("HBL", item.HBL).single();
		console.log(tracking, "ITEMSSS TARCKINg");
		try {
			const { data, status } = await axios.get(
				"https://caribe-cargo-api.vercel.app/api/items/" + item.HBL,
			);
			console.log(data.data, status);

			data.data.Location = tracking.Location;
			data.data.history = tracking.trackingHistory;
			setItemDetails(data.data);
			setIsLoadingDetails(false);
		} catch (error) {
			setItemDetails(item);
			console.log(error);
			setIsLoadingDetails(false);
		}
	};

	return (
		<div className="relative grid mx-2  ">
			<div className="flex flex-col gap-4 h-screen lg:gap-10 mx-2 lg:mx-10 ">
				<Locations setLocation={setLocation} setShowModal={setShowModal} />
				<Search items={items} setItems={setItems} />
				{isLoadingItems ? (
					<LoadingSpinner />
				) : (
					<ItemsTable
						items={items}
						setItems={setItems}
						getItemsDetails={getItemDetails}
						setShowModalDetails={setShowModalDetails}
					/>
				)}
			</div>
			<UploadModal
				showModal={showModal}
				setShowModal={setShowModal}
				location={location}
				isLoading={isLoadingItems}
			/>
			<ItemsDetailsModal
				itemDetails={itemDetails}
				showModalDetails={showModalDetails}
				setShowModalDetails={setShowModalDetails}
				isLoadingDetails={isLoadingDetails}
			/>
		</div>
	);
};
