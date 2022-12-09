import { useEffect, useState } from "react";
import { supabase } from "../../../../Supabase/SupabaseClient";

export const useGetItems = () => {
	const [items, setItems] = useState([]);
	const [isLoadingItems, setIsLoadingItems] = useState(false);

	const getItems = async () => {
		try {
			setIsLoadingItems(true);
			let { data: items, error } = await supabase
				.from("tracking")
				.select("HBL,TrackingId,Location");

			if (!error) {
				setItems(items);
				setIsLoadingItems(false);
			}
			throw error;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getItems();
	}, []);

	return { items, setItems, isLoadingItems };
};
