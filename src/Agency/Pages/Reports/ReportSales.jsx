import { React, useState } from "react";
import { AreaChart, Card, DateRangePicker, DonutChart, Title } from "@tremor/react";

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

const ventasCTE = [
	{
		name: "Baby",
		sales: 9100,
	},
	{
		name: "Chely",
		sales: 4567,
	},
	{
		name: "Yulima",
		sales: 3908,
	},
];
const ventasAgencias = [
	{
		name: "Cte",
		sales: 19100,
	},
	{
		name: "RapidMultiServices",
		sales: 9567,
	},
	{
		name: "OML Cargo",
		sales: 3908,
	},
	{
		name: "Cuba Encarga",
		sales: 908,
	},
	{
		name: "Mof Group",
		sales: 9088,
	},
];

const dataFormatter = (number) => {
	return "$ " + Intl.NumberFormat("us").format(number).toString();
};
const valueFormatter = (number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const ReportSales = () => {
	const [value, setValue] = useState([new Date(2022, 1, 1), new Date()]);
	return (
		<div className="px-4 mx-2 relative">
			<h1> ReportSales</h1>
			<DateRangePicker
				className="max-w-md mx-auto"
				value={value}
				onValueChange={setValue}
				dropdownPlaceholder="Seleccionar"
			/>
			<div className="flex flex-wrap justify-evenly">
				<Card className="max-w-lg mt-6">
					<Title>Ventas de CTE</Title>
					<DonutChart
						className="mt-6"
						data={ventasCTE}
						category="sales"
						index="name"
						valueFormatter={valueFormatter}
						colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
					/>
				</Card>
				<Card className="max-w-lg mt-6">
					<Title>Ventas de Agencias</Title>
					<DonutChart
						className="mt-6"
						data={ventasAgencias}
						category="sales"
						index="name"
						valueFormatter={valueFormatter}
						colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
					/>
				</Card>
			</div>
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
			</Card>
		</div>
	);
};
