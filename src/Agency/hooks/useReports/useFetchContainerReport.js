import { useQuery } from "react-query";
import axios from "axios";
export const getContainerReport = async (ContainerId) => {
	const { data } = await axios.get(
		"https://caribe-cargo-api.vercel.app/api/containers/report/" + ContainerId,
	);
	return data;
};

export const useFetchContainerReport = (selectedContainer) => {
	return useQuery(
		["fetchContainerReport", selectedContainer?.ContainerId],
		() => getContainerReport(selectedContainer?.ContainerId),
		{ enabled: !!selectedContainer?.ContainerId },
	);
};
