import { Container } from "postcss";
import { useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";

export const getProductsInContainer = async (ContainerId) => {
	if (!ContainerId) return;
	console.log(ContainerId, "ContainerId");
	try {
		const { data: productsInContainer, error } = await supabase
			.from("productsTracking")
			.select("*")
			.match({ StatusId: 1, ContainerId: ContainerId });
		console.log(productsInContainer, "PRODUCTS IN CONTAINER");
		if (error) throw new Error(error.message);
		return productsInContainer;
	} catch (error) {
		console.log(error.message);
	}
};

export const useFetchProductsInContainer = (ContainerId) =>
	useQuery({
		queryKey: ["fetchProductsInContainer", ContainerId],
		queryFn: () => getProductsInContainer(ContainerId),
	});
