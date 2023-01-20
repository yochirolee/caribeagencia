import { useQuery } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

export const getProductsByLocation = async (LocationId = undefined, ContainerId = undefined) => {
	try {
		if (!LocationId) return;
		if (ContainerId) {
			let { data: products, error } = await supabase
				.from("trackingLocation")
				.select("*")
				.match({ ContainerId })
				.order("CreatedAt", { ascending: false });
			return products;
		} else {
			let { data: products, error } = await supabase
				.from("trackingLocation")
				.select("*")
				.eq("LocationId", LocationId)
				.order("CreatedAt", { ascending: false });
			return products;
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

export const useFetchProductsByLocation = (LocationId, ContainerId) =>
	useQuery(
		["fetchProductsByLocation", LocationId, ContainerId],
		() => getProductsByLocation(LocationId, ContainerId),
		{
			enabled: Boolean(LocationId, ContainerId),
		},
	);
