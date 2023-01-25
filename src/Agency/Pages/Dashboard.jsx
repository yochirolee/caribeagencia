import { React, useState } from "react";
import { SearchResult } from "../Components/Search/searchResult";
import { InputHBL } from "../Components/ui/Forms/InputHBL";
import { useFetchByInvoiceOrHBL } from "../hooks/useFetchByInvoiceOrHBL";

export const Dashboard = () => {
	const [search, setSearch] = useState(undefined);

	const { data, isError, isLoading } = useFetchByInvoiceOrHBL(search);

	/* const getData = async () => {
		const { data: count, error } = await supabase.rpc("getLocations");
		console.log(count,error);
	};

	useEffect(() => {
		getData();
	}, []); */

	const handleSearch = (e) => {
		setSearch(e);
	};
	return (
		<div className="px-10">
			<div className="p-10 flex  gap-10">
				<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
					<span className="p-2 bg-yellow-300 rounded-lg text-yellow-800">120</span>
					<h3>Desagrupados</h3>
				</div>
				<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
					<span className="p-2 bg-blue-300 rounded-lg text-blue-800">120</span>
					<h3>Nacionalizados</h3>
				</div>
				<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
					<span className="p-2 bg-orange-300 rounded-lg text-orange-800">120</span>
					<h3>Pendientes de Traslado</h3>
				</div>
				<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
					<span className="p-2 bg-green-300 rounded-lg text-green-800">120</span>
					<h3>En Traslado</h3>
				</div>
				<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
					<span className="p-2 bg-green-300 rounded-lg text-green-800">120</span>
					<h3>Entregados</h3>
				</div>
			</div>
			<div className="px-10">
				<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
			</div>
			{isLoading ? (
				<div role="status" class="animate-pulse">
					<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
					<div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
					<div className="flex items-center justify-center mt-4">
						<svg
							className="w-10 h-10 mr-2 text-gray-200 dark:text-gray-700"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
								clip-rule="evenodd"
							></path>
						</svg>
						<div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
						<div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
					</div>
					<span className="sr-only">Loading...</span>
				</div>
			) : (
				<>
					<SearchResult selectedProductDetails={data} />
				</>
			)}
		</div>
	);
};
