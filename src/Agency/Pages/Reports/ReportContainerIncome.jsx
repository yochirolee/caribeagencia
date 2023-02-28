import { React } from "react";
import { useState } from "react";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { TableContainerIncome } from "../../Components/Tables/TableContainerIncome";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchContainerIncome } from "../../hooks/useReports/useFetchContainerIncome";

export const ReportContainerIncome = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const {
		data: containerData,
		isError: isErrorFetchingContainer,
		isLoading: isLoadingContainer,
	} = useFetchContainerIncome(selectedContainer);

	return (
		<div className=" p-4 m-4">
			<h1>Reporte de Facturacion por Contenedor</h1>
			<ContainerSelect
				selectedContainer={selectedContainer}
				setSelectedContainer={setSelectedContainer}
			/>
			{!selectedContainer ? (
				""
			) : isLoadingContainer ? (
				<SearchResultSkeleton />
			) : (
				<TableContainerIncome containerData={containerData} />
			)}
		</div>
	);
};
