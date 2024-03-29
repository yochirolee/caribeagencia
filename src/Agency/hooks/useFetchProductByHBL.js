import { useQuery } from "react-query";
import axios from "axios";

const fetchProductByHBL = async (HBL) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/products/" + HBL);
	return data;
};

export const useFetchProductByHBL = (HBL) =>
	useQuery(["fetchProductByHBL", HBL], () => fetchProductByHBL(HBL), {
		enabled: Boolean(HBL),
	});
