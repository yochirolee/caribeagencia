import { data } from "autoprefixer";
import axios from "axios";
import { useState } from "react";
import { React } from "react";
import { useQuery } from "react-query";
import { supabase } from "../../../Supabase/SupabaseClient";
import { SearchForm } from "./Components/Forms/SearchForm";
import { HBLDetails } from "./Components/HBLDetails/HBLDetails";

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

const fetchInvoiceList = async (InvoiceId) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/invoices/" + InvoiceId);

	if (data.lenght > 0) {
		data.Items.map(async (item) => {
			const tracking = await fetchItemsHistory(item.HBL);
			item.History = tracking.trackingHistory;
			item.Location = tracking.Location;
		});
	}
	return data;
};

export const TrackingByInvoice = () => {
	//	const InvoiceId = 5373;
	const [search, setSearch] = useState(undefined);

	const {
		isLoading,
		isError,
		data: Invoices,
		error,
	} = useQuery(["invoice", search], () => fetchInvoiceList(search), {
		enabled: Boolean(search),
	});

	if (isError) return <div>{error.message}</div>;

	return (
		<div className="px-10">
			<SearchForm search={search} setSearch={setSearch} isSearching={isLoading} />
			{Invoices ? (
				<div className="px-10 mt-10 ">
					<div className="flex gap-4 border rounded-lg p-4 ">
						<div className="text-sm flex flex-col gap-4 justify-between">
							<p>
								Factura:
								<span className="mx-2 p-1 bg-blue-300 rounded-lg text-blue-800">
									{Invoices?.InvoiceId}
								</span>
							</p>
							<p className="flex">
								Agencia:
								<span className="mx-2 p-1 bg-green-500 text-white rounded-lg">
									{Invoices?.Agency}
								</span>{" "}
							</p>
						</div>
						<div className="text-sm mx-4">
							<h3>Cliente</h3>
							<p>Nombre: {Invoices?.Customer?.Name + " " + Invoices?.Customer?.LastName}</p>
							<p>Celular: {Invoices?.Customer?.Mobile}</p>
						</div>
						<div className="text-sm mx-4">
							<h3>Destinatario</h3>
							<p>{Invoices?.Reciever?.Name + " " + Invoices?.Reciever?.LastName}</p>
							<p>{Invoices?.Receiver?.Phone}</p>
							<p>{Invoices?.Reciever?.Mobile}</p>
						</div>
					</div>
					<div>
						{Invoices?.Items.map((item) => (
							<HBLDetails item={item} />
						))}
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};
