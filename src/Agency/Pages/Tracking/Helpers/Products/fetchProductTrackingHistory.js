import { supabase } from "../../../../../Supabase/SupabaseClient";

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
	let trackingHistory = [];

	for (let index = 0; index <= product.TrackingState; index++) {
		const history = createLocation(index, product);
		trackingHistory = [...trackingHistory, history];
	}
	trackingHistory.reverse();
	return trackingHistory;
};

export const fetchProductTrackingHistory = async (product) => {
	let productHistory = createProductHistory(product);

	let { data: tracking, error } = await supabase
		.from("trackingHistory")
		.select("*")
		.order("CreatedAt", { ascending: false })
		.eq("HBL", product.HBL);

	if (error) throw new Error(error.message);
	if (tracking) productHistory = [...tracking, ...productHistory];
	return productHistory;
};
