import { useState } from "react";
import { React } from "react";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { ListInvoicesByProvince } from "../../Components/ui/List/ListInvoicesByProvince";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchContainerByContainerId } from "../../hooks/useContainers/useFetchContainerByContainerId";


export const ReportContainerTransport = () => {
	const [selectedContainer, setSelectedContainer] = useState(undefined);
	const {
		data: container,
		isError: isErrorFetchingContainer,
		isLoading: isLoadingContainer,
	} = useFetchContainerByContainerId(selectedContainer);
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
				<div className="mt-4">
					<SearchResultSkeleton />
				</div>
			) : (
				<ListInvoicesByProvince invoices={container?.productsInContainerGroupByCity} />
			)}
		</div>
	);
};
