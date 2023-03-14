import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { React, useMemo } from "react";

const getTypeOfInvoice = (uniqueInvoices) => {
	let InvoicesType = [];
	let miscelaneas = uniqueInvoices.filter(
		(item) => item.ProductType == "4" || item.ProductType == "1",
	);
	const duraderos = uniqueInvoices.filter((item) => item.ProductType == "2");

	InvoicesType.push({ name: "Duraderos", value: duraderos.length });
	InvoicesType.push({ name: "Miscelaneas o Medicinas", value: miscelaneas.length });

	return {
		InvoicesType,
	};
};

export const InvoiceContainerStats = ({ filteredProducts }) => {
	const uniqueInvoices = [
		...new Map(filteredProducts?.map((item) => [item["InvoiceId"], item])).values(),
	];

	const { InvoicesType } = useMemo(() => getTypeOfInvoice(uniqueInvoices), [filteredProducts]);
	return (
		<Card className="max-w-md mt-4">
			<Title>
				Total de Facturas:{" "}
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
		</Card>
	);
};
