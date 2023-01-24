import { Spinner } from "flowbite-react";
import { React, useState } from "react";
import { SearchResult } from "../Components/Search/searchResult";
import { InputHBL } from "../Components/ui/Forms/InputHBL";
import { useFetchByInvoiceOrHBL } from "../hooks/useFetchByInvoiceOrHBL";
import { useFetchInvoiceById } from "../hooks/useFetchInvoiceById";
import { useFetchProductByHBL } from "../hooks/useFetchProductByHBL";

export const Dashboard = () => {
	const [search, setSearch] = useState(undefined);

	const { data, isError, isLoading } = useFetchByInvoiceOrHBL(search);

	console.log(data, "DATAAAAAAAA");

	const handleSearch = (e) => {
		setSearch(e);
	};
	return (
		<div className="px-10">
			<div className="p-10 flex  justify-between">
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
			</div>
			<div className="">
				<InputHBL handleHBL={handleSearch} placeHolder="Buscar por Factura o HBL" />
			</div>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<SearchResult selectedProductDetails={data} />
				</>
			)}
		</div>
	);
};
