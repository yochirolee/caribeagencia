import { useMemo } from "react";
import { React } from "react";

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
		return 12;
	} else {
		return 18;
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
export const TableStopsByProvince = ({ containerStops }) => {
	const { totalByStops,totalByInvoices, stops, invoices } = useMemo(() => {
		if (!containerStops) return 0;
		return calculateTransportationCost(containerStops);
	}, [containerStops?.length]);
	return (
		<div className="flex flex-col border-b gap-4 text-xs my-4 p-4 ">
			<div className="flex items-center justify-end gap-4 ">
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
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden h-[calc(100vh-21rem)] overflow-y-auto ">
						<table className="min-w-full text-center ">
							<thead className="border-b bg-gray-50">
								<tr>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Paradas
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Facturas
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Provincia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										Municipio
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-6 py-4">
										SubTotal
									</th>
								</tr>
							</thead>
							<tbody>
								{containerStops?.map((stop, index) => (
									<tr key={index} className="bg-white border-b">
										<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
											{stop?.StopsCount}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{stop?.InvoicesCount}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{stop?.Provincia}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{stop?.Municipio}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											${stop?.StopsCount * calculateTotal(stop?.Provincia, stop?.Municipio)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
