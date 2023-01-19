import { useQuery } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

export const getAllProducts = async () => {
	let { data: unGroupProducts, error } = await supabase
		.from("trackingHistory_duplicate")
		.select("*")
		.eq("Location", "Desagrupe");

	return unGroupProducts;
};




export const useFetchProducts = () => useQuery("getAllProducts", () => getAllProducts());
