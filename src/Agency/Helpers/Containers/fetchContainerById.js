import axios from "axios";

export const fetchContainerById = async (ContainerId) => {
	const { data } = await axios.get(
		"https://caribe-cargo-api.vercel.app/api/containers/" + ContainerId,
	);

	return data;
};
