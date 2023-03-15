export const calculateDeliveryForInvoice = (provincia, municipio) => {
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

export const CalculateDeliveryForContainer = (invoicesWithDelivery) => {
	console.log(invoicesWithDelivery, "INVOICES WITH DELIVERY");

	const totalPagar = invoicesWithDelivery.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.PaymentForDelivery);
	}, 0);

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

	console.log(InvoicesProvincias, "Resto de Provincias");
	console.log(InvoicesMunicipios, "Resto de Municipios");

	const pagarHabArtMay = InvoicesHabArtMay.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.PaymentForDelivery);
	}, 0);

	const pagarCabezeras = InvoicesProvincias.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.PaymentForDelivery);
	}, 0);
	const pagarMunicipios = InvoicesMunicipios.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.PaymentForDelivery);
	}, 0);

	console.log(totalPagar, pagarCabezeras, pagarHabArtMay, "TOTAL A PAGAR");

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
