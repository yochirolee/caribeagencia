import { useQuery } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

export const getProductsByLocation = async (
	LocationId = undefined,
	ContainerId = undefined,
	unGroupStatus = undefined,
) => {
	console.log(ContainerId, LocationId, unGroupStatus, "CONTAIERN ID AND LOCATION");
	if (LocationId == 1 && !ContainerId) return;
	try {
		if (ContainerId) {
			let { data: products, error } = await supabase
				.from("productsTracking")
				.select("*")
				.match({ LocationId: LocationId, ContainerId: ContainerId })
				.order("CreatedAt", { ascending: true });
			if (error) throw new Error(error.message);

			return products;
		} else {
			let { data: products, error } = await supabase
				.from("productsTracking")
				.select("*")
				.eq("LocationId", LocationId)
				.order("CreatedAt", { ascending: true });
			if (error) throw new Error(error.message);
			return products;
		}
	} catch (error) {
		console.error(error.message);
	}
};

export const useFetchProductsByLocation = (LocationId, ContainerId) =>
	useQuery(["fetchProductsByLocation", LocationId, ContainerId], () =>
		getProductsByLocation(LocationId, ContainerId),
	);
