import React, { useState } from "react";
import { ItemsTable } from "./Components/ItemsTable";
import { Locations } from "./Components/Locations";
import { UploadModal } from "./Components/UploadModal";
import { supabase } from "../../../Supabase/SupabaseClient";
import { useEffect } from "react";

export const Items = () => {
	const [items, setItems] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const getTrackingItems = async () => {
		let { data: tracking, error } = await supabase.from("tracking").select("*");
		setItems(tracking);
	};

	useEffect(() => {
		getTrackingItems();
	}, []);

	return (
		<>
			<div className="flex flex-col lg:gap-10 mx-2 lg:mx-10 relative">
				<Locations setShowModal={setShowModal} trackingList={items} />
				<ItemsTable trackingList={items} />

				<UploadModal showModal={showModal} setShowModal={setShowModal} />
			</div>
		</>
	);
};
