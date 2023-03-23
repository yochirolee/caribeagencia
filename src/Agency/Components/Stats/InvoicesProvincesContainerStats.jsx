import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { React, useMemo } from "react";

const getInvoicesByProvinces = (filteredProducts) => {
	const uniqueProvinces = [
		...new Map(filteredProducts?.map((item) => [item["InvoiceId"], item])).values(),
	];
	const provinces = uniqueProvinces.reduce((group, product) => {
		const { Provincia } = product;
		group[Provincia] = group[Provincia] ?? [];
		group[Provincia].push(product);
		return group;
	}, []);

	let Invoices = [];

	for (const [key, value] of Object.entries(provinces)) {
		Invoices.push({
			name: key,
			value: value.length,
		});
	}

	return Invoices;
};

export const InvoicesProvincesContainerStats = ({ invoicesList }) => {
	console.log("filteredProducts", invoicesList);
	const invoicesGroupByProvince = useMemo(
		() => getInvoicesByProvinces(invoicesList),
		[invoicesList],
	);

	return (
		<Card className="max-w-md mt-4">
			<Title>No. Facturas por Provincia:</Title>
			<Flex className="mt-4">
				<Text>
					<Bold>Prvincia</Bold>
				</Text>
				<Text>
					<Bold>Facturas</Bold>
				</Text>
			</Flex>
		
				<BarList data={invoicesGroupByProvince} className="mt-2" />
			
		</Card>
	);
};
