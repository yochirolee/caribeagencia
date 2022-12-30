import axios from "axios";

export const fetchProductByHBL = async (HBL) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/products/" + HBL);
	return data.data;
};
