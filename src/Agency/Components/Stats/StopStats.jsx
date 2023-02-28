import { React, useMemo } from "react";
import { useFetchContainerStopsByRecievers } from "../../hooks/useReports/useFetchContainerStops";

const calculateTotal = (provincia, municipio) => {
	if (!provincia || !municipio) return 0;

	if (provincia == "La Habana" || provincia == "Artemisa" || provincia == "Mayabeque") {
		return 6;
	}
	if (provincia == "Villa Clara" && municipio == "Santa Clara") {
		return 12;
	}
	if (provincia == "Granma" && municipio == "Bayamo") {
		return 12;
	}
	if (provincia.trim().toLowerCase() == municipio.trim().toLowerCase()) {
		return 16;
	} else {
		return 16;
	}
};

const calculateTransportationCost = (containerStops) => {
	let totalByInvoices = 0;
	let totalByStops = 0;
	let stops = 0;
	let invoices = 0;
	containerStops?.map((stop) => {
		totalByInvoices += calculateTotal(stop?.Provincia, stop?.Municipio) * stop.InvoicesCount;
		totalByStops += calculateTotal(stop?.Provincia, stop?.Municipio) * stop.StopsCount;
		stops += stop.StopsCount;
		invoices += stop.InvoicesCount;
	});
	return { totalByInvoices, stops, invoices, totalByStops };
};

export const StopStats = ({ selectedContainer }) => {
	const {
		data: containerStops,
		isError: isErrorFetchingContainer,
		isLoading: isLoadingContainer,
	} = useFetchContainerStopsByRecievers(selectedContainer);

	const { totalByStops, totalByInvoices, stops, invoices } = useMemo(() => {
		if (!containerStops) return 0;
		return calculateTransportationCost(containerStops);
	}, [containerStops?.length]);

	if (isLoadingContainer)
		return <div className="h-8 w-xl bg-gray-50 rounde-lg animate-pulse"></div>;

	return (
		<div className="flex items-center text-xs justify-end gap-4 ">
			<div className="font-semibold flex justify-end items-center gap-2">
				Total de Facturas:
				<span className="px-2 py-0.5 bg-blue-200 rounded-lg text-blue-800">{invoices}</span>
			</div>
			<div className="font-semibold flex justify-end items-center gap-2">
				Total de Paradas:
				<span className="px-2 py-0.5 bg-green-200 rounded-lg text-green-800">{stops}</span>
			</div>
			<div className="font-semibold justify-end flex items-center gap-2">
				Total a Pagar por Facturas:
				<span className="px-2 py-0.5 bg-yellow-200 rounded-lg text-yellow-800">
					$ {totalByInvoices}
				</span>
			</div>
			<div className="font-semibold justify-end flex items-center gap-2">
				Total a Pagar por Paradas:
				<span className="px-2 py-0.5 bg-yellow-200 rounded-lg text-yellow-800">
					$ {totalByStops}
				</span>
			</div>
		</div>
	);
};
