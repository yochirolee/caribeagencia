import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";



const upsertProductsTrakingHistory = async (productsTrakingList) => {
	let productsTrackingListHistory = await productsTrakingList.map((product) => {
		return {
			LocationId: product?.LocationId,
			HBL: product?.HBL,
			HBLLocation: product.HBL + "-" + product.LocationId,
		};
	});

	try {
		const { data, error } = await supabase
			.from("productsTrackingHistory")
			.insert(productsTrackingListHistory)
			.select("*");
		if (error) throw new Error(error.message);
		console.log(data, "PRODCUT TARCKING HISTORY DONE");
	} catch (error) {
		console.error(error);
	}
};

const upsertProductsTracking = async (productsList, locationId) => {
	let productsTrackingList = await productsList.map((product) => {
		return { HBL: product.HBL, LocationId: locationId };
	});

	try {
		const { data: trackingResult, error } = await supabase
			.from("tracking")
			.upsert(productsTrackingList, { onConflict: "HBL" })
			.select("*");
		if (error) throw new Error(error.message);
		console.log(trackingResult, "ON TARCKING RESULT UPSERT");
		return trackingResult;
	} catch (error) {
		console.log(error);
	}
};

const unGroupProducts = async ({ products }) => {
	try {
		const { data, error } = await supabase
			.from("productsTracking")
			.upsert(products, { onConflict: "HBL" })
			.select("*");
		if (error) throw new Error(error.message);
		if (data) {
			//let trackingResult = await upsertProductsTracking(data, 1);
			//console.log(trackingResult, "TARCKING RESULT");
			if (data) await upsertProductsTrakingHistory(data);
		}
	} catch (error) {
		console.log(error);
	}
};

export const useUnGroupProducts = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ products, locationId, user, status }) =>
			unGroupProducts({ products, locationId, user, status }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["fetchProductsInContainer"],
			});
			queryClient.invalidateQueries({
				queryKey: ["fetchProductsByLocation"],
			});
		},
	});
};
