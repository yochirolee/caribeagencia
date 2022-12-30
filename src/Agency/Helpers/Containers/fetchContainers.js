import axios from "axios";

export const fetchContainers = async () => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/containers/");
	return data;
};
