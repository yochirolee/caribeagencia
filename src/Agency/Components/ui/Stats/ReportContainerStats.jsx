import { BarsArrowDownIcon } from "@heroicons/react/20/solid";
import { FaBalanceScaleRight, FaDollarSign } from "react-icons/fa";
import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import { React, useMemo } from "react";
import { sumFields } from "../../../Utils/calculateCostByContainer";

export const ReportContainerStats = ({ filteredProducts, selectedAgency }) => {
	const uniqueInvoices = [
		...new Map(filteredProducts?.map((item) => [item["InvoiceId"], item])).values(),
	];
	const weight = useMemo(
		() => sumFields(filteredProducts, "Weight"),
		[filteredProducts, selectedAgency],
	);

	const total = useMemo(
		() => sumFields(filteredProducts, "AgencyPayment"),
		[filteredProducts, selectedAgency],
	);

	const delivery = useMemo(
		() => sumFields(filteredProducts, "Delivery"),
		[uniqueInvoices, selectedAgency],
	);

	const discount = useMemo(() => sumFields(uniqueInvoices, "Discount"), [uniqueInvoices]);

	return (
		<div className="container mt-6 flex  flex-wrap align-middle xl:grid xl:grid-cols-6 gap-4  p-4  bg-gray-50  ">
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>No Facturas</Text>
						<Metric className="text-xl">{uniqueInvoices.length}</Metric>
					</div>
				</Flex>
			</Card>
			<Card >
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaBalanceScaleRight} variant="light" size="sm" color="orange" />
					<div className="truncate ">
						<Text>Peso</Text>
						<Metric className="text-xl">
							{weight} <span className="text-xs">Lbs</span>
						</Metric>
					</div>
				</Flex>
			</Card>

			<Card >
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaBalanceScaleRight} variant="light" size="sm" />
					<div className="truncate ">
						<Text>Total Facturado</Text>
						<Metric className="text-xl">$ {total}</Metric>
					</div>
				</Flex>
			</Card>
			<Card >
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaBalanceScaleRight} variant="light" size="sm" color="red" />
					<div className="truncate ">
						<Text>Descuento</Text>
						<Metric className="text-xl">$ {discount}</Metric>
					</div>
				</Flex>
			</Card>

			<Card >
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaBalanceScaleRight} variant="light" size="sm" color="yellow" />
					<div className="truncate ">
						<Text>Total Delivery</Text>
						<Metric className="text-xl">$ {delivery}</Metric>
					</div>
				</Flex>
			</Card>
			<Card >
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaDollarSign} variant="light" size="sm" color="green" />
					<div className="truncate ">
						<Text>Ganancia</Text>
						<Metric className="text-xl">$ {parseFloat(total - discount).toFixed(2)}</Metric>
					</div>
				</Flex>
			</Card>
		</div>
	);
};
