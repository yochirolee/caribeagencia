import { useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";

export const getUngroupedProducts = async (ContainerId) => {
	if (!ContainerId) return;
	try {
		let { data: products, error } = await supabase
			.from("productsTracking")
			.select("*")
			.eq( 'ContainerId', ContainerId)
			.gte("StatusId", 2)
			.order("CreatedAt", { ascending: false });

		if (error) throw new Error(error.message);

		return products;
	} catch (error) {
		console.error(error.message);
	}
};

export const useFetchUngroupedProductsByContainer = (ContainerId) =>
	useQuery(["fetchProductsByLocation", ContainerId], () => getUngroupedProducts(ContainerId), {
		enabled: Boolean(ContainerId),
	});
