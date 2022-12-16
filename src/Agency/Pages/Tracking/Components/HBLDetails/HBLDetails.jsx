import { React } from "react";
import { useQuery } from "react-query";
import { supabase } from "../../../../../Supabase/SupabaseClient";
import { HistoryTimeLine } from "../HistoryTimeLine";

export const HBLDetails = ({ item }) => {
	const createLocation = (index, item) => {
		console.log(item);
		switch (index) {
			case 0:
				return {
					HBL: item.HBL,
					Location: "Facturado",
				};

			case 1:
				return {
					HBL: item.HBL,
					Location: "En Almacen",
				};

			case 2:
				return {
					HBL: item.HBL,
					Location: "En Pallet" + " " + item.Pallet,
				};

			case 3:
				return {
					HBL: item.HBL,
					Location: "En Contenedor",
					Container: item.ContainerNumber,
				};

			default:
				break;
		}
	};

	const createItemHistory = (item) => {
		let trackingHistory = [];

		for (let index = 0; index <= item.Location; index++) {
			const history = createLocation(index, item);
			trackingHistory = [...trackingHistory, history];
		}
		trackingHistory.reverse();
		return trackingHistory;
	};

	const fetchItemsHistory = async (HBL) => {
		let itemHistory = createItemHistory(item);

		let { data: tracking, error } = await supabase
			.from("trackingHistory")
			.select("*")
			.order("CreatedAt", { ascending: false })
			.eq("HBL", HBL);

		if (error) throw new Error(error.message);
		if (tracking) itemHistory = [...tracking, ...itemHistory];
		return itemHistory;
	};

	const {
		isLoading,
		isError,
		data: itemsDetails,
		error,
	} = useQuery(["item", item.HBL], () => fetchItemsHistory(item.HBL));

	if (isLoading) return <div>...Loading please Wait</div>;
	if (isError) return <div>{error.message}</div>;
	console.log(itemsDetails);

	return (
		<>
			<div key={item.TrackingId} className="flex flex-col  justify-between text-center  my-2 p-4">
				<div className="flex items-center text-left gap-4 py-4 text-xs">
					<p className="font-semibold border p-4 bg-blue-600 text-white rounded-lg">
						{itemsDetails[0].Location}
					</p>
					<p className="text-xs font-semibold">{item.HBL}</p>
					<p>{item.Description}</p>
				</div>
				<div className="inline-flex">
					<HistoryTimeLine history={itemsDetails} />
				</div>
			</div>
		</>
	);
};
