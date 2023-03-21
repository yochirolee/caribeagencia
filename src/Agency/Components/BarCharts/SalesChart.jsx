import { useMemo, useState } from "react";
import { AreaChart, Card, Flex, Text, Title, Toggle, ToggleItem } from "@tremor/react";
import { groupAndMerge } from "../../Utils/groupAndMerge";
import { format, parseISO } from "date-fns";

const performance = (invoices) => {
  console.log(invoices, "invoices")
	const mergedInvoices = groupAndMerge(invoices, "fecha", "total");
	console.log(mergedInvoices, "mergedInvoices");

	return mergedInvoices.map((invoice) => {
		let sumTotal = parseFloat(
			invoice.total
				.reduce((accumulator, currentValue) => {
					return parseFloat(accumulator) + parseFloat(currentValue);
				}, 0)
				.toFixed(2),
		);

		return {
			name: invoice.agencia,
			Sales: sumTotal,
			Invoices: invoice.total?.length,
			date: format(parseISO(invoice.fecha), "dd/MM/yyyy"),
		};
	});
};

export const SalesChart = ({ invoices }) => {
	const caribeTravelExpressInvocies = invoices?.filter(
		(invoice) => invoice.agencia === "Caribe Travel Express",
	);

	const performanceResult = useMemo(() => performance(caribeTravelExpressInvocies), [invoices]);
	const [selectedKpi, setSelectedKpi] = useState("Sales");

	return (
		<Card>
			<div className="md:flex justify-between">
				<div>
					<Flex justifyContent="start" className="space-x-0.5" alignItems="center">
						<Title> Historial de Venta: Caribe Travel Express </Title>
					</Flex>
					<Text> Incremento o Decremento de Ventas Diario</Text>
				</div>
				<div className="mt-6 md:mt-0">
					<Toggle
						color="zinc"
						defaultValue={selectedKpi}
						onValueChange={(value) => setSelectedKpi(value)}
					>
						<ToggleItem value="Sales" text="Ventas" />
						<ToggleItem value="Invoices" text="Facturas" />
					</Toggle>
				</div>
			</div>
			<AreaChart
				data={performanceResult}
				index="date"
				categories={[selectedKpi]}
				colors={["blue"]}
				showLegend={false}
				yAxisWidth={56}
				className="h-96 mt-8"
			/>
		</Card>
	);
};
