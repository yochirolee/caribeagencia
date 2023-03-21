import { BarsArrowDownIcon } from "@heroicons/react/20/solid";
import { Card, Flex, Icon, Text, Metric } from "@tremor/react";
import { React, useMemo } from "react";
import { sumFields } from "../../../Utils/calculateCostByContainer";

export const ContainerTransportStats = ({ products, amountToPayForDelivery }) => {
	const weight = useMemo(() => sumFields(products, "TotalWeight"), [products, ""]);
	const delivery = useMemo(() => sumFields(products, "Delivery"), [products, ""]);
	const payment = useMemo(() => sumFields(products, "TotalPayment"), [products, ""]);
	const discount = useMemo(() => sumFields(products, "Discount"), [products, ""]);

	return (
		<div className="container mx-auto mt-6 flex rounded-lg flex-wrap align-middle xl:grid xl:grid-cols-6 gap-4  p-4  bg-gray-50  ">
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>No Facturas</Text>
						<Metric className="text-xl">{products.length}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>Peso (Lbs)</Text>
						<Metric className="text-xl">{weight}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>Delivery a Pagar </Text>
						<Metric className="text-xl">{parseFloat(amountToPayForDelivery).toFixed(2)}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>Delivery Cobrado </Text>
						<Metric className="text-xl">{delivery}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>Cobrado </Text>
						<Metric className="text-xl">{payment}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>Descuentos </Text>
						<Metric className="text-xl">{discount}</Metric>
					</div>
				</Flex>
			</Card>
		</div>
	);
};
