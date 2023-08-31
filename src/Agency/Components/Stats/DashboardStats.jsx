import { BellSnoozeIcon } from "@heroicons/react/20/solid";
import { Card, Flex, Text, Metric, Icon } from "@tremor/react";
import { React, useMemo } from "react";
import {
	FaBalanceScaleRight,
	FaShip,
	FaShippingFast,
	FaTruckLoading,
	FaWarehouse,
} from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import { GrUserPolice } from "react-icons/gr";
import { useFetchLocations } from "../../hooks/useFetchLocations";

const colorLocations = [
	{
		color: "gray",
		icon: () => <FaShip />,
	},
	{
		color: "gray",
		icon: () => <FaShip />,
	},
	{
		color: "violet",
		icon: () => <FaWarehouse />,
	},
	{
		color: "red",
		icon: () => <GrUserPolice />,
	},
	{
		color: "yellow",
		icon: () => <FaTruckLoading />,
	},
	{
		color: "blue",
		icon: () => <FaShippingFast />,
	},
	{
		color: "green",
		icon: () => <MdOutlineDownloadDone />,
	},
];
export const DashboardStats = ({ filteredProducts }) => {
	if (!filteredProducts) return null;

	const locationCount = useMemo(() => {
		return Object.values(
			filteredProducts.reduce((r, { LocationId }) => {
				r[LocationId] = { LocationId, count: (r[LocationId]?.count || 0) + 1 };

				return r;
			}, {}),
		);
	}, [filteredProducts]);

	const { data: locations } = useFetchLocations();

	const getLocationCount = (locationId) => {
		const count = locationCount.find((loc) => locationId == loc.LocationId)?.count;
		return count ? count : 0;
	};

	return (
		<div className="container  flex  flex-wrap align-middle xl:grid xl:grid-cols-6 gap-4  p-4  bg-gray-50  ">
			{locations?.map((location, index) => (
				<Card key={index}>
					<Flex justifyContent="start" className="space-x-4">
						<Icon
							icon={colorLocations[location?.LocationId]?.icon}
							variant="light"
							size="sm"
							color={colorLocations[location?.LocationId]?.color}
						/>
						<div className="truncate ">
							<Text>{location?.LocationName}</Text>
							<Metric className="text-xl">{getLocationCount(location?.LocationId)}</Metric>
						</div>
					</Flex>
				</Card>
			))}
		</div>
	);
};
