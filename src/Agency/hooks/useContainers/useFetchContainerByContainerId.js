import { useQuery } from "react-query";
import axios from "axios";
export const getContainerById = async (ContainerId) => {
	const { data } = await axios.get(
		"https://caribe-cargo-api.vercel.app/api/containers/" + ContainerId,
	);
	return data;
};

export const useFetchContainerByContainerId = (selectedContainer) => {
	return useQuery(
		["ProductsInContainer", selectedContainer?.ContainerId],
		() => getContainerById(selectedContainer?.ContainerId),
		{ enabled: !!selectedContainer?.ContainerId },
	);
};
