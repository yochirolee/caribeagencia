import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";

const categories = [
	{
		title: "Sales",
		metric: "$ 23,456,456",

		color: "indigo",
	},
	{
		title: "Profit",
		metric: "$ 13,123",

		color: "fuchsia",
	},
	{
		title: "Customers",
		metric: "456",

		color: "amber",
	},
];

export default function AgencyStats() {
	return (
		<Grid numItemsSm={2} numItemsLg={3} className="gap-6">
			{categories.map((item) => (
				<Card key={item.title} decoration="top" decorationColor={item.color}>
					<Flex justifyContent="start" className="space-x-4">
						<div className="truncate">
							<Text>{item.title}</Text>
							<Metric className="truncate">{item.metric}</Metric>
						</div>
					</Flex>
				</Card>
			))}
		</Grid>
	);
}
