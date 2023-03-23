import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { React, useMemo } from "react";
const calculateTotalMiscelaneas = (products) => {
	let miscelaneas6 = 0;
	let miscelaneas11 = 0;
	let miscelaneas22 = 0;
	let miscelaneas44 = 0;
	let cantMiscelaneas = [];
	if (!products) return { cantMiscelaneas };
	let medicamentos = products?.filter((item) => item.ProductType == "4");
	const miscelaneas = products?.filter((item) => item.ProductType == "1");
	const duraderos = products?.filter(
		(item) => item?.ProductType == "2" || item?.ProductType == "6" || item?.ProductType == "3",
	);

	miscelaneas?.forEach((item) => {
		if (parseFloat(item.Weight).toFixed(2) == 6.6) {
			miscelaneas6++;
		}
		if (parseFloat(item.Weight).toFixed(2) == 11.0) {
			miscelaneas11++;
		}
		if (parseFloat(item.Weight).toFixed(2) == 22.0) {
			miscelaneas22++;
		}
		if (parseFloat(item.Weight).toFixed(2) == 44.0) {
			miscelaneas44++;
		}
	});
	cantMiscelaneas.push({ name: "Duraderos", value: duraderos.length });
	cantMiscelaneas.push({ name: "Miscelaneas 6.6 Lbs", value: miscelaneas6 });
	cantMiscelaneas.push({ name: "Miscelaneas 11 Lbs", value: miscelaneas11 });
	cantMiscelaneas.push({ name: "Miscelaneas 22 Lbs", value: miscelaneas22 });
	cantMiscelaneas.push({ name: "Miscelaneas 44 Lbs", value: miscelaneas44 });
	cantMiscelaneas.push({ name: "Medicina", value: medicamentos.length });

	return {
		cantMiscelaneas,
	};
};
export const HBLContainerStats = ({ products }) => {
	if (!products) return null;
	const { cantMiscelaneas } = useMemo(() => calculateTotalMiscelaneas(products), [products]);
	return (
		<Card className="max-w-md mt-4">
			<Title>
				Total de HBL: <span className="p-2 bg-gray-200 rounded-lg"> {products.length}</span>
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
