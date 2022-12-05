import React, { useState } from "react";
import { ItemsTable } from "./Components/ItemsTable";
import { Locations } from "./Components/Locations";
import { UploadModal } from "./Components/UploadModal";
import { supabase } from "../../../Supabase/SupabaseClient";
import { useEffect } from "react";

export const Items = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [location, setLocation] = useState("En Almacen");

	const getTrackingItems = async () => {
		let { data: tracking, error } = await supabase.from("tracking").select("*").order('created_at', { ascending: true });
		setItems(tracking);
	};

	useEffect(() => {
		getTrackingItems();
	}, [isLoading]);

	return (
		<>
			<div className="flex flex-col gap-4 h-screen lg:gap-10 mx-2 lg:mx-10 relative">
				<Locations setLocation={setLocation} setShowModal={setShowModal} />
				<UploadModal
					showModal={showModal}
					setShowModal={setShowModal}
					location={location}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
				<ItemsTable items={items} setItems={setItems}/>
			</div>
		</>
	);
};
