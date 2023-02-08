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

const calculateTransportationCost = (invoices) => {
	let total = 0;
	let InvoicesCount = 0;
	invoices?.map((invoice) => {
		total += calculateTotal(invoice?.Provincia, invoice?.Municipio) * invoice.InvoiceCount;
		InvoicesCount += invoice.InvoiceCount;
	});
	return { total, InvoicesCount };
};
export const ListInvoicesByProvince = ({ invoices }) => {
	const { total, InvoicesCount } = useMemo(() => {
		if (!invoices) return 0;

		return calculateTransportationCost(invoices);
	}, [invoices?.length]);

	return (
		<div className="flex flex-col border-b gap-4 text-xs my-4 p-4 ">
			<div className="flex items-center justify-end gap-4">
				
				<div className="font-semibold flex justify-end items-center gap-2">
					Total de Facturas:
					<span className="p-2 bg-yellow-300 rounded-lg text-yellow-800">{InvoicesCount}</span>
				</div>
				<div className="font-semibold justify-end flex items-center gap-2">
					Total a Pagar por Transportacion:
					<span className="p-2 bg-yellow-300 rounded-lg text-yellow-800">$ {total}</span>
				</div>
			</div>
			{invoices?.map((invoice, index) => (
				<>
					<div className="grid grid-flow-col grid-cols-3 grid-col  border-b gap-4 text-xs" key={index}>
						
						<p>No.Facturas: {invoice?.InvoiceCount}</p>
						<p> {invoice?.Provincia}</p>
						<p> {invoice?.Municipio}</p>
						<p>
							SubTotal:{" "}
							{invoice?.InvoiceCount * calculateTotal(invoice?.Provincia, invoice?.Municipio)}
						</p>
					</div>
				</>
			))}
		</div>
	);
};
