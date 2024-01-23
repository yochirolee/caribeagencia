import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

/*const changeProductListLocation = async (listProducts) => {
	if (!listProducts) return;

 	try {
		const response = await supabase
			.from("trackingLocation")
			.upsert(listProducts, { onConflict: "HBL" })
			.select("*");
		const { data, status, error, statusText } = response;
		console.log(response, "RESPONSE", error);
		console.log(data, status, statusText, "tracking Location");

		const dataToInsert = listProducts.map((product) => {
			product.HBLLocationHistory = product.HBL + "-" + Location.LocationId;
			product.LocationId = Location.LocationId;
			return product;
		});

		const {
			data: history,
			error: errorHistory,
			statusText: statusText2,
		} = await supabase
			.from("trackingLocationHistory")
			.upsert(dataToInsert, { onConflict: "HBLLocationHistory" })
			.select();
		console.log(history, errorHistory, "HISTORY");
		if (data) setShowModal(false);
	} catch (error) {
		throw new Error(error);
	}
}; */

const upsertProductsTrakingHistory = async (productsTrakingList, user) => {
	let productsTrackingListHistory = await productsTrakingList.map((product) => {
		return {
			LocationId: product?.LocationId,
			HBL: product?.HBL,
			UserId: user?.id,
			HBLLocation: product.HBL + "-" + product.LocationId,
			CreatedAt: product.CreatedAt,
		};
	});

	try {
		const { data, error } = await supabase
			.from("productsTrackingHistory")
			.upsert(productsTrackingListHistory, { onConflict: "HBLLocation" })
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

const changeProductListLocation = async ({ products, locationId, user, StatusId, CreatedAt }) => {
	try {
		let prod = await products.map((product) => {
			return {
				TrackingId: product?.TrackingId,
				LocationId: locationId,
				InvoiceId: product?.InvoiceId,
				HBL: product?.HBL,
				Description: product?.Description,
				CustomerId: product?.CustomerId,
				RecieverId: product?.RecieverId,
				Location: product?.Location,
				ContainerName: product?.ContainerName,
				ContainerId: product?.ContainerId,
				CityId: product?.CityId,
				StateId: product?.StateId,
				PalletId: product?.PalletId,
				AgencyName: product?.AgencyName,
				ProductWeight: product?.ProductWeight,
				StatusId: StatusId,
				CreatedAt: CreatedAt,
			};
		});

		const uniqueProducts = prod.filter((v, i, a) => a.findIndex((t) => t.HBL === v.HBL) === i);
		const { data, error } = await supabase
			.from("productsTracking")
			.upsert(uniqueProducts, { onConflict: "HBL" })
			.select("*");
		if (error) throw new Error(error.message);
		if (data) {
			console.log(data)
			//let trackingResult = await upsertProductsTracking(data, 1);
			//console.log(trackingResult, "TARCKING RESULT");
			if (data) await upsertProductsTrakingHistory(data, user);
		}
	} catch (error) {
		console.log(error);
	}
};

export const useSetProductListLocation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ products, locationId, user, StatusId = 4, CreatedAt }) =>
			changeProductListLocation({ products, locationId, user, StatusId, CreatedAt }),
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
