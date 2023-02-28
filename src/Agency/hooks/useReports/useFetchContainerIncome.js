import { useQuery } from "react-query";
import axios from "axios";
export const getContainerIncome = async (ContainerId) => {
	const { data } = await axios.get(
		"https://caribe-cargo-api.vercel.app/api/containers/income/" + ContainerId,
	);
	return data;
};

export const useFetchContainerIncome = (selectedContainer) => {
	return useQuery(
		["fetchContainerIncome", selectedContainer?.ContainerId],
		() => getContainerIncome(selectedContainer?.ContainerId),
		{ enabled: !!selectedContainer?.ContainerId },
	);
};
