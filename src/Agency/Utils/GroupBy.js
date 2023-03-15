import { calculateDeliveryForInvoice } from "./calculateDelivery";

export const GroupBy = (array, key) => {
	if (!array) return [];
	return array.reduce((previous, currentItem) => {
		const group = currentItem[key];
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, []);
};
export const GroupByFormatter = (array, key) => {
	if (!array) return [];
	let invoicesFormatted = [];
	const uniqueInvoices = array.reduce((previous, currentItem) => {
		const group = currentItem[key];
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, []);

	for (const [key, value] of Object.entries(uniqueInvoices)) {
		invoicesFormatted.push({ 
			InvoiceId: key,
			Provincia: value[0].Provincia,
			Municipio: value[0].Municipio,
			ProductType: value[0].ProductType,
			TotalWeight: value.map((item) => parseFloat(item.Weight)).reduce((a, b) => a + b, 0),
			PaymentForDelivery: calculateDeliveryForInvoice(value[0].Provincia, value[0].Municipio),
			HBLS: [...value],
		});
		
	}
	console.log(invoicesFormatted,"INVOICSE FORMATED");
	return invoicesFormatted;
};
