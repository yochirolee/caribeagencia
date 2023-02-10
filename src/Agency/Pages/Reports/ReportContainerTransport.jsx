import { useState } from "react";
import { React } from "react";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { TableStopsByProvince } from "../../Components/Tables/TableStopsByProvince";
import { ListStopsByProvince } from "../../Components/ui/List/ListStopsByProvince";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchContainerStopsByRecievers } from "../../hooks/useReports/useFetchContainerStops";

export const ReportContainerTransport = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const {
		data: containerStops,
		isError: isErrorFetchingContainer,
		isLoading: isLoadingContainer,
	} = useFetchContainerStopsByRecievers(selectedContainer);
	return (
		<div className=" p-4 m-4">
			<h1>Reporte de Transportacion por Contenedores</h1>
			<ContainerSelect
				selectedContainer={selectedContainer}
				setSelectedContainer={setSelectedContainer}
			/>
			{!selectedContainer ? (
				""
			) : isLoadingContainer ? (
				<SearchResultSkeleton />
			) : (
				<TableStopsByProvince containerStops={containerStops} />
			)}
		</div>
	);
};
