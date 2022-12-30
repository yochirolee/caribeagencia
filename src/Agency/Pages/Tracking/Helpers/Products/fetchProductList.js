import axios from "axios";
import { supabase } from "../../../../../Supabase/SupabaseClient";

export const fetchProductList = async () => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/products/");
	return data;
};

export const fetchTrackingProductHistory = async ({ search }) => {
	if (search.length > 8) {
		let { data: tracking, error } = await supabase.from("tracking").select("*").eq("HBL", search);
		return tracking;
	} else {
 		let { data: tracking, error } = await supabase.from("tracking").select("*");
		return tracking;
	}
};
