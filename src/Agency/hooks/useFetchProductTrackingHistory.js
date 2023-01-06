import { useQuery } from "react-query";
import { supabase } from "../../Supabase/SupabaseClient";

const createLocation = (index, product) => {
	switch (index) {
		case 0:
			return {
				HBL: product.HBL,
				Location: "Facturado",
			};

		case 1:
			return {
				HBL: product.HBL,
				Location: "En Almacen",
			};

		case 2:
			return {
				HBL: product.HBL,
				Location: "En Pallet" + " " + product.Pallet,
			};

		case 3:
			return {
				HBL: product.HBL,
				Location: "En Contenedor",
				Container: product.ContainerNumber,
			};

		default:
			break;
	}
};

const createProductHistory = (product) => {
	if (!!product) {
		let trackingHistory = [];

		for (let index = 0; index <= product.Location; index++) {
			const history = createLocation(index, product);
			trackingHistory = [...trackingHistory, history];
		}
		trackingHistory.reverse();
		return trackingHistory;
	}
	return null;
};
const getProductTrackingHistory = async (HBL) => {
	let { data: tracking, error } = await supabase
		.from("trackingHistory")
		.select("*")
		.order("CreatedAt", { ascending: false })
		.eq("HBL", HBL);
	return tracking;
};
export const useFetchProductTrackingHistory = async (product) => {
	if (!product) return;
	let productHistory = createProductHistory(product);

	const {
		isLoading,
		isError,
		data: productTrackingHistory,
		error,
	} = useQuery(["fetchProductTrackingHistory", product.HBL], () => getProductTrackingHistory(product.HBL), {
		enabled: Boolean(product.HBL),
	});

	if (isError) throw new Error(error.message);
	if (productTrackingHistory) productHistory = [...productTrackingHistory, ...productHistory];
	console.log(productHistory, "PRODUCT HISTORY");
	return productHistory;
};
