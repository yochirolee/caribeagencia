import { BarsArrowDownIcon } from "@heroicons/react/20/solid";
import { MdDone } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import { React } from "react";
export const UnGroupContainerStats = ({ productList, productsInContainer }) => {
	if (!productList) return;
	const undeclared = productList?.filter((product) => product?.StatusId == 3);

	return (
		<div className="   mt-6 flex  flex-wrap align-middle xl:grid xl:grid-cols-4 gap-4  p-4  bg-gray-50  ">
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={FaBoxes} variant="light" size="sm" color="blue" />
					<div className="truncate">
						<Text>Total Desagrupado:</Text>
						<Metric className="text-xl"> {productList?.length + undeclared.length}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={MdDone} variant="light" size="sm" color="green" />
					<div className="truncate">
						<Text>Correctos:</Text>
						<Metric className="text-xl"> {productList?.length}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>No Manifestados:</Text>
						<Metric className="text-xl"> {undeclared?.length}</Metric>
					</div>
				</Flex>
			</Card>
			<Card>
				<Flex justifyContent="start" className="space-x-4">
					<Icon icon={BarsArrowDownIcon} variant="light" size="sm" color="gray" />
					<div className="truncate">
						<Text>Faltantes:</Text>
						<Metric className="text-xl">
							{" "}
							{productsInContainer ? productsInContainer.length : 0}
						</Metric>
					</div>
				</Flex>
			</Card>
		</div>
	);
};
