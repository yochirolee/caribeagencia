import { calculateDeliveryCost } from "./calculateDelivery";
import { groupAndMerge } from "./groupAndMerge";

export const formatListOfInvoices = (invoices, selectedContainer) => {
	if (!invoices || !selectedContainer) {
		const finalFormattedInvoices = [];

		return finalFormattedInvoices;
	}

	const ContainerNumber = selectedContainer?.ContainerNumber;
	const formattedInvoices = [];
	invoices.forEach((invoice) => {
		const {
			ContainerId,
			InvoiceId,
			InvoiceDate,
			ProductType,
			AgencyName,
			RecieverAddress,
			RecieverName,
			Phones,
			StateId,
			CityId,
			Provincia,
			Municipio,
			Weight,
			AgencyPayment,
			Discount,
			HBL,
			Delivery,
			Description,
		} = invoice;
		formattedInvoices.push({
			ContainerId,
			ContainerNumber,
			InvoiceId,
			InvoiceDate,
			ProductType,
			AgencyName,
			RecieverAddress,
			RecieverName,
			Phones,
			StateId,
			CityId,
			Discount,
			Provincia,
			Municipio,
			Delivery,

			Products: { Weight, HBL, Description, AgencyPayment },
		});
	});
	const merged = groupAndMerge(formattedInvoices, "InvoiceId", "Products");
	const finalFormattedInvoices = merged.map((invoice) => {
		let sumTotalWeight = invoice.Products.reduce((accumulator, currentValue) => {
			return parseFloat(accumulator) + parseFloat(currentValue.Weight);
		}, 0);
		let sumTotalPayment = invoice.Products.reduce((accumulator, currentValue) => {
			return parseFloat(accumulator) + parseFloat(currentValue.AgencyPayment);
		}, 0);
		const { deliveryByLocation, deliveryByOverweight, deliveryByHandling, hasDelivery } =
			calculateDeliveryCost(sumTotalWeight, invoice.Provincia, invoice.Municipio);

		return {
			...invoice,
			TotalPayment: sumTotalPayment,
			TotalWeight: sumTotalWeight,
			HasDelivery: hasDelivery,
			DeliveryByLocation: deliveryByLocation,
			DeliveryByOverWeight: deliveryByOverweight,
			DeliveryByHandling: deliveryByHandling,
		};
	});

	return finalFormattedInvoices;
};
