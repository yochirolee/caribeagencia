import { useIsFetching } from "react-query";

export const GlobalLoadingIndicator = () => {
	const isFetching = useIsFetching();

	return isFetching ? (
		<div className="text-xs ">Queries are fetching in the background...</div>
	) : null;
};
