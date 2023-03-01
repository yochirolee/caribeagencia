import { useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";

export const getProductsByContainerId = async (ContainerId) => {
	if (!ContainerId) {
		try {
			const { data, error } = await supabase
				.from("productsTracking")
				.select(`*,locations ( *)`)
				.limit(50);

			if (error) throw new Error(error.message);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	} else {
		try {
			const { data: productsInContainer, error } = await supabase
				.from("productsTracking")
				.select(`*,locations ( *)`)
				.eq("ContainerId", ContainerId);
			if (error) throw new Error(error.message);
			return productsInContainer;
		} catch (error) {
			console.log(error.message);
		}
	}
};

export const useFetchAllProductsByContainerId = (ContainerId) =>
	useQuery({
		queryKey: ["fetchProductsInContainer", ContainerId],
		queryFn: () => getProductsByContainerId(ContainerId),
	});
