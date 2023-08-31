import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import { React, useMemo } from "react";
const calculateTotalMiscelaneas = (products) => {
	let miscelaneas6 = 0;
	let miscelaneas11 = 0;
	let miscelaneas22 = 0;
	let miscelaneas44 = 0;
	let comida6 = 0;
	let comida11 = 0;
	let comida22 = 0;
	let comida44 = 0;
	let cantMiscelaneas = [];
	if (!products) return { cantMiscelaneas };

	const miscelaneas = products?.filter((item) => item?.ProductType == "1");
	const miscelaneas2 = products?.filter(
		(item) => item.ProductType == "7" || item.ProductType == "4",
	);
	const duraderos = products?.filter(
		(item) => item?.ProductType == "2" || item?.ProductType == "6" || item?.ProductType == "3",
	);

	const celulares = products?.filter((item) => item?.ProductType == "5");

	const faltantes = [];

	miscelaneas?.forEach((item) => {
		if (parseFloat(item.Weight) <= 6.6) {
			miscelaneas6++;
			return;
		}
		if (6.6 < parseFloat(item.Weight) && parseFloat(item.Weight) <= 11) {
			miscelaneas11++;
			return;
		}
		if (11 < parseFloat(item.Weight) && parseFloat(item.Weight) <= 22) {
			miscelaneas22++;
			return;
		}
		if (22 < parseFloat(item.Weight)) {
			console.log(item, "miscelaneas 44");
			miscelaneas44++;
			return;
		}
		faltantes.push(item);
	});

	miscelaneas2?.forEach((item) => {
		if (0 < parseFloat(item.Weight) && parseFloat(item.Weight) <= 6.6) {
			comida6++;
			return;
		}
		if (6.6 < parseFloat(item.Weight) && parseFloat(item.Weight) <= 11) {
			comida11++;
			return;
		}
		if (11 < parseFloat(item.Weight) && parseFloat(item.Weight) <= 22) {
			comida22++;
			return;
		}
		if (22 < parseFloat(item.Weight)) {
			comida44++;
			return;
		}
		faltantes.push(item);
	});

	cantMiscelaneas.push({ name: "Duraderos", value: duraderos.length });
	cantMiscelaneas.push({ name: "Celulares", value: celulares.length });
	cantMiscelaneas.push({ name: "Miscelaneas 6.6 Lbs", value: miscelaneas6 });
	cantMiscelaneas.push({ name: "Miscelaneas 11 Lbs", value: miscelaneas11 });
	cantMiscelaneas.push({ name: "Miscelaneas 22 Lbs", value: miscelaneas22 });
	cantMiscelaneas.push({ name: "Miscelaneas 44 Lbs", value: miscelaneas44 });
	cantMiscelaneas.push({ name: "Comida/Aseo/Medicamentos 6 Lbs", value: comida6 });
	cantMiscelaneas.push({ name: "Comida/Aseo/Medicamentos 11 Lbs", value: comida11 });
	cantMiscelaneas.push({ name: "Comida/Aseo/Medicamentos 22 Lbs", value: comida22 });
	cantMiscelaneas.push({ name: "Comida/Aseo/Medicamentos 44 Lbs", value: comida44 });


	console.log(miscelaneas2.length)
	const totalToPay =
		miscelaneas2.length * 50 +
		miscelaneas6 * 50 +
		miscelaneas11 * 194 +
		miscelaneas22 * 554;

	return {
		cantMiscelaneas,
		totalToPay,
	};
};
export const HBLContainerStats = ({ products }) => {
	if (!products) return null;
	const { cantMiscelaneas, totalToPay } = useMemo(
		() => calculateTotalMiscelaneas(products),
		[products],
	);
	return (
		<Card className="max-w-md mt-4">
			<Title>
				Total de HBL: <span className="p-2 bg-gray-200 rounded-lg"> {products.length} </span>
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
			<div className="flex justify-between mt-4 p-4 text-lg border rounded-lg bg-blue-50 ">
				<p>Total a Pagar en CUP</p>
				<b>{parseFloat(totalToPay).toFixed(2)}</b>
			</div>
		</Card>
	);
};
