import { React, useMemo, useState } from "react";
import { supabase } from "../../../Supabase/SupabaseClient";
import { SearchResult } from "../../Components/Search/searchResult";
import { SearchResultSkeleton } from "../../Components/Skeletons/searchResultSkeleton";
import { DashboardStats } from "../../Components/Stats/DashboardStats";
import { ProductsTable } from "../../Components/Tables/ProductsTable";
import { InputHBL } from "../../Components/ui/Forms/InputHBL";
import ContainerSelect from "../../Components/ui/Selects/ContainerSelect";
import { useFetchContainerByContainerId } from "../../hooks/useContainers/useFetchContainerByContainerId";
import { useFetchByInvoiceOrHBL } from "../../hooks/useFetchByInvoiceOrHBL";

export const Dashboard = () => {
	const [search, setSearch] = useState("");
	const { data, isError, isLoading } = useFetchByInvoiceOrHBL(search);
	const handleSearch = async (e) => {
		setSearch(e);
	};

	return (
		<div className="px-10 inline-block shrink-0 container  mt-10  ">
			<DashboardStats />

			<div className="p-2 mt-4 ">
				<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
				{isLoading ? (
					<SearchResultSkeleton />
				) : (
					<>
						<SearchResult selectedProductDetails={data} />
					</>
				)}
			</div>
		</div>
	);
};
