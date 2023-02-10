import { useMemo } from "react";
import { React } from "react";

const calculateTotal = (provincia, municipio) => {
	if (!provincia || !municipio) return 0;

	if (provincia == "La Habana" || provincia == "Artemisa" || provincia == "Mayabeque") {
		return 5;
	}
	if (provincia == "Villa Clara" && municipio == "Santa Clara") {
		return 10;
	}
	if (provincia == "Granma" && municipio == "Bayamo") {
		return 10;
	}
	if (provincia.trim().toLowerCase() == municipio.trim().toLowerCase()) {
		return 10;
	} else {
		return 15;
	}
};

const calculateTransportationCost = (containerStops) => {
	let total = 0;
	let stops = 0;
	let invoices = 0;
	containerStops?.map((stop) => {
		total += calculateTotal(stop?.Provincia, stop?.Municipio) * stop.StopsCount;
		stops += stop.StopsCount;
		invoices += stop.InvoicesCount;
	});
	return { total, stops, invoices };
};
export const ListStopsByProvince = ({ containerStops }) => {
	const { total, stops, invoices } = useMemo(() => {
		if (!containerStops) return 0;
		return calculateTransportationCost(containerStops);
	}, [containerStops?.length]);

	return (
		<div className="flex flex-col border-b gap-4 text-xs my-4 p-4 ">
			<div className="flex items-center justify-end gap-4">
				<div className="font-semibold flex justify-end items-center gap-2">
					Total de Facturas:
					<span className="px-2 py-0.5 bg-yellow-300 rounded-lg text-yellow-800">{invoices}</span>
				</div>
				<div className="font-semibold flex justify-end items-center gap-2">
					Total de Paradas:
					<span className="px-2 py-0.5 bg-yellow-300 rounded-lg text-yellow-800">{stops}</span>
				</div>
				<div className="font-semibold justify-end flex items-center gap-2">
					Total a Pagar por Transportacion:
					<span className="px-2 py-0.5 bg-yellow-300 rounded-lg text-yellow-800">$ {total}</span>
				</div>
			</div>
			{containerStops?.map((stop, index) => (
				<>
					<div
						className="grid grid-flow-col p-2 grid-cols-4 grid-col  border-b gap-4 text-xs"
						key={index}
					>
						<p>
							Paradas:
							<span className="px-2 py-0.5 mx-4  bg-green-500 text-white  rounded-lg">
								{stop?.StopsCount}
							</span>
						</p>
						<p>
							Facturas:
							<span className="px-2 py-0.5 mx-4  bg-gray-600 text-white  rounded-lg">
								{stop?.InvoicesCount}
							</span>
						</p>
						<p> {stop?.Provincia}</p>
						<p> {stop?.Municipio}</p>
						<p>
							SubTotal:
							<span className="px-2 py-0.5 font-semibold">
								${stop?.StopsCount * calculateTotal(stop?.Provincia, stop?.Municipio)}
							</span>
						</p>
					</div>
				</>
			))}
		</div>
	);
};
