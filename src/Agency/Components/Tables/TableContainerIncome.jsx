import { React, useMemo } from "react";

const truncateString = (str, num) => {
	if (str.length <= num) {
		return str;
	}
	return str.slice(0, num) + "...";
};

const calculateTotalPaidByAgencies = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumWithInitial = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.AgencyPayment);
	}, initialValue);

	return parseFloat(sumWithInitial).toFixed(2);
	// Expected output: 10
};

const calculateTotalweight = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotalWeight = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Weight);
	}, initialValue);

	return parseFloat(sumTotalWeight).toFixed(2);
	// Expected output: 10
};

const calculateTotalDiscount = (containerData) => {
	if (!containerData) return 0;
	const initialValue = 0;
	const sumTotalDiscount = containerData.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Discount);
	}, initialValue);

	return parseFloat(sumTotalDiscount).toFixed(2);
	// Expected output: 10
};

const calculateDiscountByInvoices = (containerData) => {
	const key = "Discount";
	const uniqueInvoices = [...new Map(containerData.map((item) => [item[key], item])).values()];

	const initialValue = 0;

	const sumTotalDiscount = uniqueInvoices.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.Discount);
	}, initialValue);

	return parseFloat(sumTotalDiscount).toFixed(2);
};

const calculateTotalDuraderos = (containerData) => {
	const duraderos = containerData.filter((item) => item.ProductType == "2");
	const uniqueInvoices = [...new Map(duraderos.map((item) => [item["InvoiceId"], item])).values()];

	return uniqueInvoices;
};

const GroupBy = (array, key) =>
	array.reduce((previous, currentItem) => {
		const group = currentItem[key];
		if (!previous[group]) previous[group] = [];
		previous[group].push(currentItem);
		return previous;
	}, {});

const getDuraderosByProvince = (containerData) => {
	const duraderos = calculateTotalDuraderos(containerData);
	const groupedByProvince = GroupBy(duraderos, "Provincia");
	let duraderosGroupByProvince = [];
	for (const [key, value] of Object.entries(groupedByProvince)) {
		duraderosGroupByProvince.push({
			Province: key,

			InvoiceId: [...value],
		});
	}

	return { duraderosGroupByProvince, duraderos };
};

const calculateTotalMedicamentos = (containerData) => {
	const medicinas = containerData.filter((item) => item.ProductType == "4");
	return medicinas;
};

const calculateTotalMiscelaneas = (containerData) => {
	let miscelaneas6 = 0;
	let miscelaneas11 = 0;
	let miscelaneas22 = 0;
	let miscelaneas44 = 0;
	let medicamentos = calculateTotalMedicamentos(containerData);
	const miscelaneas = containerData.filter((item) => item.ProductType == "1");

	miscelaneas.forEach((item) => {
		if (parseFloat(item.Weight).toFixed(2) == 6.6) {
			miscelaneas6 += 1;
		}
		if (parseFloat(item.Weight).toFixed(2) == 11.0) {
			miscelaneas11 += 1;
		}
		if (parseFloat(item.Weight).toFixed(2) == 22.0) {
			miscelaneas22 += 1;
		}
		if (parseFloat(item.Weight).toFixed(2) == 44.0) {
			miscelaneas44 += 1;
		}
	});

	return { miscelaneas, miscelaneas6, miscelaneas11, miscelaneas22, miscelaneas44, medicamentos };
};

/* --------------------------------COSTOS-------------------------------- */
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

const calculateTransportationCost = (containerData) => {
	console.log(containerData, "ContainerDATA");
	let totalByInvoices = 0;
	let totalByStops = 0;
	let stops = 0;
	let invoices = 0;
	containerData?.map((stop) => {
		totalByInvoices += calculateTotal(stop?.Provincia, stop?.Municipio) * stop.InvoicesCount;
		totalByStops += calculateTotal(stop?.Provincia, stop?.Municipio) * stop.StopsCount;
		stops += stop.StopsCount;
		invoices += stop.InvoicesCount;
	});
	return { totalByInvoices, stops, invoices, totalByStops };
};

const calculateTotalInvoices = (containerData) => {
	let uniqueInvoices = GroupBy(containerData, "InvoiceId");
	let Invoices = [];

	for (const [key, value] of Object.entries(uniqueInvoices)) {
		Invoices.push({
			InvoiceId: key,
			Provincia: value[0].Provincia,
			Municipio: value[0].Municipio,
			ProductType: value[0].ProductType,
			TrasportationCost: calculateTotal(value[0].Provincia, value[0].Municipio),
			HBLS: [...value],
		});
	}

	console.log(Invoices, "IncoiesMiscelaneas");

	const totalPagar = Invoices.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.TrasportationCost);
	}, 0);

	const InvoicesHabArtMay = Invoices.filter(
		(item) =>
			item.Provincia == "La Habana" ||
			item.Provincia == "Artemisa" ||
			item.Provincia == "Mayabeque",
	);
	const InvoicesRestoProvincias = Invoices.filter(
		(item) =>
			item.Provincia != "La Habana" &&
			item.Provincia != "Artemisa" &&
			item.Provincia != "Mayabeque",
	);

	const Provincias = InvoicesRestoProvincias.filter(
		(currentValue) =>
			(currentValue.Provincia == "Villa Clara" && currentValue.Municipio == "Santa Clara") ||
			(currentValue.Provincia == "Granma" && currentValue.Municipio == "Bayamo") ||
			currentValue.Provincia.trim().toLowerCase() == currentValue.Municipio.trim().toLowerCase(),
	);

	const InvoicesMunicipios = InvoicesRestoProvincias.filter(
		(invoice) => !Provincias.includes(invoice),
	);

	console.log(Provincias, "Resto de Provincias");
	console.log(InvoicesMunicipios, "Resto de Municipios");

	const pagarHabArtMay = InvoicesHabArtMay.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.TrasportationCost);
	}, 0);

	const pagarCabezeras = Provincias.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.TrasportationCost);
	}, 0);
	const pagarMunicipios = InvoicesMunicipios.reduce((accumulator, currentValue) => {
		return parseFloat(accumulator) + parseFloat(currentValue.TrasportationCost);
	}, 0);

	console.log(totalPagar, pagarCabezeras, pagarHabArtMay, "TOTAL A PAGAR");

	return { Invoices, totalPagar, pagarHabArtMay, pagarCabezeras, pagarMunicipios };
};

/* -------------------------------- END COSTOS-------------------------------- */

export const TableContainerIncome = ({ containerData }) => {
	const totalPaidByAgencies = useMemo(
		() => calculateTotalPaidByAgencies(containerData),
		[containerData],
	);

	const totalWeight = useMemo(() => calculateTotalweight(containerData), [containerData]);
	const totalDiscount = useMemo(() => calculateDiscountByInvoices(containerData), [containerData]);

	const { duraderosGroupByProvince, duraderos } = useMemo(
		() => getDuraderosByProvince(containerData, "Provincia"),
		[containerData],
	);

	const { miscelaneas, miscelaneas11, miscelaneas22, miscelaneas6, miscelaneas44, medicamentos } =
		useMemo(() => calculateTotalMiscelaneas(containerData), [containerData]);

	/* const { totalByInvoices, stops, invoices, totalByStops } = useMemo(
		() => calculateTransportationCost(containerData),
		[containerData],
	); */

	const { Invoices, totalPagar, pagarHabArtMay, pagarCabezeras, pagarMunicipios } = useMemo(
		() => calculateTotalInvoices(miscelaneas),
		[containerData],
	);

	console.log(duraderos, "duraderos");

	return (
		<div className="flex flex-col border-b gap-4 text-xs my-4 p-4 ">
			<div className=" grid xl:grid-cols-2  gap-10">
				<table name="Transportation Cost Table" className="min-w-full text-center ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Total de Facturas
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Total a Pagar
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Pago Provincias(Hav-Art-May)
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Pago Capitales Provincias
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Pago Municipios
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b">
							<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
								{Invoices.length}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{totalPagar}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{pagarHabArtMay}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{pagarCabezeras}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{pagarMunicipios}
							</td>
						</tr>
					</tbody>
				</table>
				<table name="Miscelaneas Invoices Table" className="min-w-full text-center ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Total de Facturas Miscelaneas
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Facturas 6.6 Lbs
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Facturas 11 Lbs
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Facturas 22 Lbs
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Facturas 44 Lbs
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b">
							<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
								{miscelaneas.length}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{miscelaneas6}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{miscelaneas11}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{miscelaneas22}
							</td>
							<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
								{miscelaneas44}
							</td>
						</tr>
					</tbody>
				</table>
				<table name="Miscelaneas Invoices Table" className="min-w-full text-center ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Total de Facturas Medicamentos
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b">
							<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
								{medicamentos.length}
							</td>
						</tr>
					</tbody>
				</table>
				<table name="Miscelaneas Invoices Table" className="min-w-full text-center ">
					<thead className="border-b bg-gray-50">
						<tr>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Total de Facturas Duradero
							</th>
							<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
								Facturas Duradero Por Provincias
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b">
							<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
								{duraderos.length}
							</td>

							{duraderosGroupByProvince.map((province) => (
								<div className="flex justify-between p-2">
									<td className="flex gap-4 border-red-500">{province.Province}</td>
									<td className="flex gap-4 border-red-500">{province.InvoiceId.length}</td>
								</div>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
				<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden h-[calc(100vh-21rem)] overflow-y-auto ">
						<table className="min-w-full text-center ">
							<thead className="border-b bg-gray-50">
								<tr>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Agencia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Factura
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										HBL
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Tipo de Producto
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Descripcion
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Peso (Lbs)
									</th>

									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Provincia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Municipio
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Precio Agencia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Descuento
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Pagado por Agencia
									</th>
									<th scope="col" className="text-xs font-medium text-gray-900 px-4 py-4">
										Delivery
									</th>
								</tr>
							</thead>
							<tbody>
								{containerData?.map((data, index) => (
									<tr key={index} className="bg-white border-b">
										<td className="px-6  py-4 whitespace-nowrap text-xs font-medium text-gray-900">
											{data?.AgencyName}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.InvoiceId}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.HBL}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.ProductType}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{truncateString(data?.Description, 10)}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.Weight}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.Provincia}
										</td>
										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{data?.Municipio}
										</td>

										<td className="text-xm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
											{parseFloat(data.AgencyPayment / data?.Weight).toFixed(2)}
										</td>

										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{data?.Discount}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{data?.AgencyPayment}
										</td>
										<td className="text-xm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											{data?.DeliveryCost}
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
