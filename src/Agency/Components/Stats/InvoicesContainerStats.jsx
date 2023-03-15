import {
	Badge,
	BarList,
	Bold,
	Card,
	Divider,
	Flex,
	List,
	ListItem,
	Text,
	Title,
} from "@tremor/react";
import { React, useMemo } from "react";
import { CalculateDeliveryForContainer } from "../../Utils/calculateDelivery";
import { GroupByFormatter } from "../../Utils/GroupBy";

const getTypeOfInvoice = (filteredProducts) => {
	let uniqueInvoices = GroupByFormatter(filteredProducts, "InvoiceId");
	let InvoicesType = [];
	let miscelaneas = uniqueInvoices.filter(
		(item) => item.ProductType == "4" || item.ProductType == "1",
	);
	const duraderos = uniqueInvoices.filter(
		(item) => item.ProductType == "2" || item.ProductType == "3" || item.ProductType == "6",
	);

	let invoicesDuraderosDelivery = duraderos.filter((item) => item.TotalWeight < 100);
	let invoicesMiscelaneasDelivery = miscelaneas.filter((item) => item.TotalWeight < 100);
	let invoicesWithDelivery = uniqueInvoices.filter((item) => item.TotalWeight < 100);

	InvoicesType.push({
		name: "Facturas Duraderos (Delivery)",
		value: invoicesDuraderosDelivery.length,
	});

	InvoicesType.push({
		name: "Facturas Miscelaneas o Medicinas (Delivery)",
		value: miscelaneas.length,
	});
	if (!miscelaneas.length == invoicesMiscelaneasDelivery.length) {
		InvoicesType.push({
			name: "Facturas Miscelaneas  (Delivery)",
			value: invoicesMiscelaneasDelivery.length,
		});
	}
	InvoicesType.push({
		name: " Facturas Duraderos Recogida en Transcargo",
		value: duraderos.length - invoicesDuraderosDelivery.length,
	});

	return {
		uniqueInvoices,
		InvoicesType,
		invoicesWithDelivery,
	};
};

export const InvoiceContainerStats = ({ filteredProducts }) => {
	const { InvoicesType, uniqueInvoices, invoicesWithDelivery } = useMemo(
		() => getTypeOfInvoice(filteredProducts),
		[filteredProducts],
	);

	const {
		InvoicesHabArtMay,
		InvoicesProvincias,
		InvoicesMunicipios,
		totalPagar,
		pagarHabArtMay,
		pagarCabezeras,
		pagarMunicipios,
	} = useMemo(() => CalculateDeliveryForContainer(invoicesWithDelivery));

	return (
		<Card className="max-w-md mt-4">
			<Title>
				Total de Facturas:
				<span className="p-2 bg-gray-200 rounded-lg"> {uniqueInvoices.length}</span>
			</Title>
			<Flex className="mt-4">
				<Text>
					<Bold>Tipo</Bold>
				</Text>
				<Text>
					<Bold>Cantidad</Bold>
				</Text>
			</Flex>
			{<BarList data={InvoicesType} className="mt-2" />}
			<Divider />
			<div className="flex justify-between my-4">
				<Title>Total de Facturas con Delivery:</Title>
				<Badge>
					<Bold>{invoicesWithDelivery.length}</Bold>
				</Badge>
			</div>
			<List className="">
				<ListItem className="font-bold">
					<span>Total a Pagar</span>
					<span>$ {totalPagar}</span>
				</ListItem>
				<ListItem >
					<span>(Hav-Art-May) - Facturas: {InvoicesHabArtMay?.length}</span>
					<span>$ {pagarHabArtMay}</span>
				</ListItem>
				<ListItem>
					<span>Cabeceras de Provincias - Facturas: {InvoicesProvincias?.length}</span>
					<span>$ {pagarCabezeras}</span>
				</ListItem>
				<ListItem>
					<span>Municipios - Facturas: {InvoicesMunicipios?.length} </span>
					<span>$ {pagarMunicipios}</span>
				</ListItem>
			</List>
		</Card>
	);
};
