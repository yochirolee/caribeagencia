import axios from "axios";

export const fetchPallets = async () => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/pallets/");

	return data;
};
