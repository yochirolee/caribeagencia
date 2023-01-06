import axios from "axios";
import { useQuery } from "react-query";

export const getAllPallets = async () => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/pallets/");

	return data.data;
};

export const useFetchAllPallets = () => useQuery("getAllPallets", () => getAllPallets());
