import { useState } from "react";
import { React } from "react";
import { useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";
import { SearchForm } from "./Components/Forms/SearchForm";
import { ProductTrackingHistory } from "./Components/ProductTrackingHistory/productTrackingHistory";
import { fetchInvoicesById } from "./Helpers/Invoices/fetchInvoiceById";

// Create styles
const fetchItemsHistory = async (HBL) => {
	try {
		let { data: tracking, error } = await supabase
			.from("tracking")
			.select(
				`
                 *,
                     trackingHistory (
                *
                )`,
			)
			.order("CreatedAt", { foreignTable: "trackingHistory", ascending: false })
			.eq("HBL", HBL)
			.single();
		return tracking;
	} catch (error) {
		console.log(error);
	}
};

export const TrackingByInvoice = () => {
	//	const InvoiceId = 5373;
	const [search, setSearch] = useState(undefined);

	const {
		isLoading,
		isError,
		data: Invoice,
		error,
	} = useQuery(["invoice", search], () => fetchInvoicesById(search), {
		enabled: Boolean(search),
	});

	if (isError)
		return (
			<div className="px-10">
				<SearchForm search={search} setSearch={setSearch} isSearching={isLoading} />
				<div
					id="toast-simple"
					className="flex items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
					role="alert"
				>
					<svg
						aria-hidden="true"
						className="w-5 h-5 text-red-600 dark:text-red-500"
						focusable="false"
						data-prefix="fas"
						data-icon="paper-plane"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
						></path>
					</svg>
					<span className="pl-4 text-red-400 text-xs">{error.message}</span>
				</div>
			</div>
		);

	return (
		<div className="px-10">
			<SearchForm setSearch={setSearch} isSearching={isLoading} />
			{Invoice ? (
				<div className=" mt-10  ">
					<div className="flex gap-4 border rounded-lg p-4 ">
						<div className="text-sm flex flex-col gap-4 justify-between">
							<p>
								Factura:
								<span className="mx-2 p-1 bg-blue-500 text-xs rounded-lg text-white">
									<a
										target="_blank"
										href={`https://systemcaribetravel.com/ordenes/factura_print.php?id=${Invoice?.InvoiceId}`}
									>
										{Invoice.InvoiceId}
									</a>
								</span>
							</p>
							<p className="flex items-center ">
								Agencia:
								<span className="mx-2 p-1 text-xs bg-green-500  text-white rounded-lg">
									{Invoice?.Agency}
								</span>
							</p>
						</div>
						<div className="text-xs mx-4 space-y-2">
							<h3 className="text-gray-500">Cliente:</h3>
							<p>Nombre: {Invoice?.Customer?.Name + " " + Invoice?.Customer?.LastName}</p>
							<p>Celular: {Invoice?.Customer?.Mobile}</p>
						</div>
						<div className="text-xs mx-4 space-y-2">
							<h3 className="text-gray-500">Destinatario:</h3>
							<p>{Invoice?.Reciever?.Name + " " + Invoice?.Reciever?.LastName}</p>
							<p>{Invoice?.Receiver?.Phone}</p>
							<p>Celular: {Invoice?.Reciever?.Mobile}</p>
						</div>
					</div>
					<div>
						{Invoice?.Products.map((product) => (
							<ProductTrackingHistory key={product.HBL} product={product} />
						))}
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};
