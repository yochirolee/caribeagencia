export const calculateDeliveryByLocation = (provincia, municipio) => {
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

export const calculateDeliveryCost = (weight, provincia, municipio) => {
	let deliveryByLocation = 0;
	let deliveryByOverweight = 0;
	let deliveryByHandling = 0;
	let hasDelivery = false;
	if (weight > 100) {
		deliveryByHandling = 10;
		return { deliveryByLocation, deliveryByOverweight, deliveryByHandling, hasDelivery };
	}

	if (weight <= 100) deliveryByLocation = calculateDeliveryByLocation(provincia, municipio);
	if (weight > 50 && weight <= 100) deliveryByOverweight = (weight - 50) * 0.1;

	return { deliveryByLocation, deliveryByOverweight, deliveryByHandling, hasDelivery: true };
};

export const CalculateDeliveryForContainer = (invoicesWithDelivery) => {
	const totalPagar = parseFloat(
		invoicesWithDelivery.reduce((accumulator, currentValue) => {
			return (
				parseFloat(accumulator) +
				parseFloat(
					currentValue.DeliveryByHandling +
						currentValue.DeliveryByLocation +
						currentValue.DeliveryByOverWeight,
				)
			);
		}, 0),
	).toFixed(2);

	const InvoicesHabArtMay = invoicesWithDelivery.filter(
		(invoice) =>
			invoice.Provincia == "La Habana" ||
			invoice.Provincia == "Artemisa" ||
			invoice.Provincia == "Mayabeque",
	);

	const InvoicesRestoProvincias = invoicesWithDelivery.filter(
		(invoice) => !InvoicesHabArtMay.includes(invoice),
	);

	const InvoicesProvincias = InvoicesRestoProvincias.filter(
		(currentValue) =>
			(currentValue.Provincia == "Villa Clara" && currentValue.Municipio == "Santa Clara") ||
			(currentValue.Provincia == "Granma" && currentValue.Municipio == "Bayamo") ||
			currentValue.Provincia.trim().toLowerCase() == currentValue.Municipio.trim().toLowerCase(),
	);

	const InvoicesMunicipios = InvoicesRestoProvincias.filter(
		(invoice) => !InvoicesProvincias.includes(invoice),
	);

	const pagarHabArtMay = parseFloat(
		InvoicesHabArtMay.reduce((accumulator, currentValue) => {
			return (
				parseFloat(accumulator) +
				parseFloat(
					currentValue.DeliveryByHandling +
						currentValue.DeliveryByLocation +
						currentValue.DeliveryByOverWeight,
				)
			);
		}, 0),
	).toFixed(2);

	const pagarCabezeras = parseFloat(
		InvoicesProvincias.reduce((accumulator, currentValue) => {
			return (
				parseFloat(accumulator) +
				parseFloat(
					currentValue.DeliveryByHandling +
						currentValue.DeliveryByLocation +
						currentValue.DeliveryByOverWeight,
				)
			);
		}, 0),
	).toFixed(2);
	const pagarMunicipios = parseFloat(
		InvoicesMunicipios.reduce((accumulator, currentValue) => {
			return (
				parseFloat(accumulator) +
				parseFloat(
					currentValue.DeliveryByHandling +
						currentValue.DeliveryByLocation +
						currentValue.DeliveryByOverWeight,
				)
			);
		}, 0),
	).toFixed(2);

	return {
		InvoicesHabArtMay,
		InvoicesProvincias,
		InvoicesMunicipios,
		totalPagar,
		pagarHabArtMay,
		pagarCabezeras,
		pagarMunicipios,
	};
};
