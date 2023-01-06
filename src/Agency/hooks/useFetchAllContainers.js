import axios from "axios";
import { useQuery } from "react-query";

export const getAllContainers = async () => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/containers/");

	return data.data;
};

export const useFetchAllContainers = () => useQuery("getAllContainers", () => getAllContainers());
