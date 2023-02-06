import { useQuery } from "react-query";
import axios from "axios";
export const fetchContainerById = async (ContainerId) => {
	const { data } = await axios.get(
		"https://caribe-cargo-api.vercel.app/api/containers/" + ContainerId,
	);

	return data
	;
};

export const useFetchProductsInContainerByContainerId = (selectedContainer) => {
	return useQuery(
		["ProductsInContainer", selectedContainer?.ContainerId],
		() => fetchContainerById(selectedContainer?.ContainerId),
		{ enabled: !!selectedContainer?.ContainerId },
	);
};
