import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { React, useMemo } from "react";
const calculateTotalMiscelaneas = (filteredProducts) => {
	let miscelaneas6 = 0;
	let miscelaneas11 = 0;
	let miscelaneas22 = 0;
	let miscelaneas44 = 0;
	let cantMiscelaneas = [];
	let medicamentos = filteredProducts.filter((item) => item.ProductType == "4");
	const miscelaneas = filteredProducts.filter((item) => item.ProductType == "1");
	const duraderos = filteredProducts.filter((item) => item.ProductType == "2");

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
export const MiscelaneasHBLStats = ({filteredProducts}) => {
	const {  cantMiscelaneas } = useMemo(
		() => calculateTotalMiscelaneas(filteredProducts),
		[filteredProducts],
	);
	return (
		<Card className="max-w-lg mt-4">
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
