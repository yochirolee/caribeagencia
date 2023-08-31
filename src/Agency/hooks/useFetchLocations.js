import { useQuery } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

export const getLocations = async () => {
	let { data: locations, error } = await supabase
		.from("locations")
		.select("*")
		.order("LocationId", { ascending: true });
	return locations;
};

export const useFetchLocations = () => useQuery("getLocations", () => getLocations());
