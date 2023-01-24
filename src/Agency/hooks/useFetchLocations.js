import { useQuery } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

export const getLocations = async () => {
	let { data: locations, error } = await supabase.from("locations").select("*");
	return locations;
};

export const useFetchLocations = () => useQuery("getLocations", () => getLocations());
