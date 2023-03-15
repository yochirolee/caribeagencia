import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { React, useMemo } from "react";
import { calculateDelivery } from "../../Utils/calculateDelivery";
import { GroupBy } from "../../Utils/GroupBy";

const getInvoicesGroupByStats = (filteredProducts) => {
	let uniqueInvoices = GroupBy(filteredProducts, "InvoiceId");
	let Invoices = [];

	for (const [key, value] of Object.entries(uniqueInvoices)) {
		Invoices.push({
			InvoiceId: key,
			Provincia: value[0].Provincia,
			Municipio: value[0].Municipio,
			ProductType: value[0].ProductType,
			TotalWeight: value.map((item) => parseFloat(item.Weight)).reduce((a, b) => a + b, 0),
			HBLS: [...value],
		});
		return Invoices;
	}
};

export const InvoicesGroupByStats = ({ filteredProducts }) => {
	const InvoicesGrouped = useMemo(
		() => getInvoicesGroupByStats(filteredProducts),
		[filteredProducts],
	);
	return (
		<Card className="max-w-md mt-4">
			<Title>
				Total de HBL: <span className="p-2 bg-gray-200 rounded-lg"> {filteredProducts.length}</span>
			</Title>
			<Flex className="mt-4">
				<Text>
					<Bold>Tipo</Bold>
				</Text>
				<Text>
					<Bold>Cantidad</Bold>
				</Text>
			</Flex>
			<BarList data={cantMiscelaneas} className="mt-2" />
		</Card>
	);
};
