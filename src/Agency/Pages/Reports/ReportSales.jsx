import { React, useMemo, useState } from "react";
import { AreaChart, BarList, Card, DateRangePicker, DonutChart, Title } from "@tremor/react";
import { useFetchInvoicesByDateRange } from "../../hooks/useReports/useFetchInvoicesByDateRange";
import { groupAndMerge } from "../../Utils/groupAndMerge";
import { ContainerBarChart } from "../../Components/BarCharts/ContainerBarChart";
import { SalesChart } from "../../Components/BarCharts/SalesChart";

const chartdata = [
	{
		date: "Jan 22",
		SemiAnalysis: 2890,
		"The Pragmatic Engineer": 2338,
	},
	{
		date: "Feb 22",
		SemiAnalysis: 2756,
		"The Pragmatic Engineer": 2103,
	},
	{
		date: "Mar 22",
		SemiAnalysis: 3322,
		"The Pragmatic Engineer": 2194,
	},
	{
		date: "Apr 22",
		SemiAnalysis: 3470,
		"The Pragmatic Engineer": 2108,
	},
	{
		date: "May 22",
		SemiAnalysis: 3475,
		"The Pragmatic Engineer": 1812,
	},
	{
		date: "Jun 22",
		SemiAnalysis: 3129,
		"The Pragmatic Engineer": 1726,
	},
];

const calculateAgencySalesCTE = (invoices, groupBy, mergeWith) => {
	if (!invoices) return [];

	const filteredInvoices = invoices.filter((invoice) => invoice.cod_agencia == 2);
	let groupedAndMerge = groupAndMerge(filteredInvoices, groupBy, mergeWith);

	return groupedAndMerge.map((invoice) => {
		let sumTotal = invoice.total.reduce((accumulator, currentValue) => {
			return parseFloat(accumulator) + parseFloat(currentValue);
		}, 0);

		return {
			name: invoice.usuario,
			sales: parseFloat(sumTotal),
			value: parseFloat(sumTotal).toFixed(2),
		};
	});
};
const calculateAgenciesSales = (invoices, groupBy, mergeWith) => {
	if (!invoices) return [];
	//group by user
	let groupedAndMerge = groupAndMerge(invoices, groupBy, mergeWith);

	/* const groupedByUser = filteredInvoices.reduce((acc, invoice) => {
		const user = invoice.usuario;
		if (!acc[user]) {
			acc[user] = {
				usuario: user,
				total: 0,
			};

			acc[user].total += parseFloat(invoice.total);
		} else {
			acc[user].total += parseFloat(invoice.total);
		}
		return acc;
	}, {}); */

	return groupedAndMerge.map((invoice) => {
		let sumTotal = invoice.total.reduce((accumulator, currentValue) => {
			return parseFloat(accumulator) + parseFloat(currentValue);
		}, 0);
		return {
			name: invoice.agencia,
			sales: sumTotal,
			value: parseFloat(sumTotal).toFixed(2),
		};
	});
};

const dataFormatter = (number) => {
	return "$ " + Intl.NumberFormat("us").format(number).toString();
};
const valueFormatter = (number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const ReportSales = () => {
	const [value, setValue] = useState([Date.now(), Date.now()]);
	const { data: invoices, isLoading } = useFetchInvoicesByDateRange(value[0], value[1]);
	const agenciesSales = useMemo(
		() => calculateAgenciesSales(invoices, "agencia", "total"),
		[invoices],
	);
	const agencySalesCte = useMemo(
		() => calculateAgencySalesCTE(invoices, "usuario", "total"),
		[invoices],
	);

	return (
		<div className="p-4  mx-2 relative">
			<h1> ReportSales</h1>

			<DateRangePicker
				className="max-w-md mx-auto"
				value={value}
				onValueChange={setValue}
				dropdownPlaceholder="Seleccionar"
			/>
			<div className="mt-4">
				<SalesChart invoices={invoices} />
				{/* <ContainerBarChart />
				<Card className="mt-6">
					<Title>Newsletter revenue over time (USD)</Title>

					<AreaChart
						className="h-72 mt-4"
						data={chartdata}
						index="date"
						categories={["SemiAnalysis", "The Pragmatic Engineer"]}
						colors={["indigo", "cyan"]}
						valueFormatter={dataFormatter}
					/>
				</Card> */}
			</div>
			<div className="flex flex-wrap justify-evenly">
				<Card className="max-w-lg mt-6">
					<Title>Ventas de CTE</Title>
					<DonutChart
						className="mt-6"
						data={agencySalesCte}
						category="sales"
						index="name"
						valueFormatter={valueFormatter}
						colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
					/>
					<BarList data={agencySalesCte} className="mt-2" />
				</Card>
				<Card className="max-w-lg mt-6">
					<Title>Ventas de Agencias</Title>
					<DonutChart
						className="mt-6"
						data={agenciesSales}
						category="sales"
						index="name"
						valueFormatter={valueFormatter}
						colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
					/>
					<BarList data={agenciesSales} className="mt-2" />
				</Card>
			</div>
		</div>
	);
};
