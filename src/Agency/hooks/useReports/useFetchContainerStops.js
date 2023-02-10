import { useQuery } from "react-query";
import axios from "axios";
export const getContainerStopsByRecievers = async (ContainerId) => {
	const { data } = await axios.get(
		"https://caribe-cargo-api.vercel.app/api/containers/stopsByRecievers/" + ContainerId,
	);
	return data;
};

export const useFetchContainerStopsByRecievers = (selectedContainer) => {
	return useQuery(
		["fetchContainerStopsByRecievers", selectedContainer?.ContainerId],
		() => getContainerStopsByRecievers(selectedContainer?.ContainerId),
		{ enabled: !!selectedContainer?.ContainerId },
	);
};
