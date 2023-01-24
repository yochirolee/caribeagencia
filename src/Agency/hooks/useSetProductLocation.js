import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

const changeProductLocation = async (product) => {
	if (!product) return;
	try {
		product.LocationId = product.LocationId ? product.LocationId + 1 : 1;
		const { data: productTracking, error: errorTracking } = await supabase
			.from("trackingLocation")
			.upsert(product, { onConflict: "HBL" })
			.single();

		product.HBLLocationHistory = product.HBL + "-" + productTracking.LocationId;

		const { data, error } = await supabase
			.from("trackingLocationHistory")
			.upsert(product, { onConflict: "HBLLocationHistory" })
			.select();
	} catch (error) {
		throw new Error(error);
	}
};

export const useSetProductLocation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (product) => changeProductLocation(product),
		onSuccess: () => {
			return queryClient.invalidateQueries({
				queryKey: ["fetchProductsByLocation"],
			});
		},
	});
};
