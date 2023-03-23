import { BarsArrowDownIcon } from "@heroicons/react/20/solid";
import { Card, Flex, Icon, Text, Metric } from "@tremor/react";
import { React, useMemo } from "react";
import { FaBalanceScale, FaDollarSign } from "react-icons/fa";
import { sumFields } from "../../../Utils/calculateCostByContainer";

export const ContainerTransportStats = ({ invoices }) => {
	const weight = useMemo(() => sumFields(invoices, "TotalWeight"), [invoices, ""]);
	const delivery = useMemo(() => sumFields(invoices, "Delivery"), [invoices, ""]);
	const payment = useMemo(() => sumFields(invoices, "TotalPayment"), [invoices, ""]);
	const discount = useMemo(() => sumFields(invoices, "Discount"), [invoices, ""]);
	const amountToPayForDelivery = useMemo(
		() =>
			invoices.reduce((acc, invoice) => {
				const { DeliveryByLocation, DeliveryByOverWeight, DeliveryByHandling } = invoice;
				const amountToPay = DeliveryByLocation + DeliveryByOverWeight + DeliveryByHandling;
				return acc + amountToPay;
			}, 0),
		[invoices],
	);

	return (
		<div className="container my-4 mx-auto mt-6 flex rounded-lg flex-wrap align-middle xl:grid xl:grid-cols-6 gap-4  p-4  bg-gray-50  ">
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="blue" />
					<div className="truncate">
						<Text>No Facturas</Text>
						<Metric className="text-xl">{invoices?.length}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaBalanceScale} variant="light" size="sm" color="yellow" />
					<div className="truncate">
						<Text>Peso (Lbs)</Text>
						<Metric className="text-xl">{weight}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaDollarSign} variant="light" size="sm" color="red" />
					<div className="truncate">
						<Text>Delivery a Pagar </Text>
						<Metric className="text-xl">{parseFloat(amountToPayForDelivery).toFixed(2)}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaDollarSign} variant="light" size="sm" color="green" />
					<div className="truncate">
						<Text>Delivery Cobrado </Text>
						<Metric className="text-xl">{delivery}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaDollarSign} variant="light" size="sm" color="green" />
					<div className="truncate">
						<Text>Total Facturado </Text>
						<Metric className="text-xl">{payment}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaDollarSign} variant="light" size="sm" color="orange" />
					<div className="truncate">
						<Text>Descuentos </Text>
						<Metric className="text-xl">{discount}</Metric>
					</div>
				</Flex>
			</Card>
		</div>
	);
};
