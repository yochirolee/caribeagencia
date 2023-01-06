import { useQuery } from "react-query";
import axios from "axios";

export const getProductsByPalletId = async (id) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/pallets/" + id);
	return data.pallet;
};

export const useFetchProductsByPalletId = (palletId) =>
	useQuery(["fetchProductsByPalletId", palletId], () => getProductsByPalletId(palletId), {
		enabled: Boolean(palletId),
	});
