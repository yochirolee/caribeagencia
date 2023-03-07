import { React, useMemo } from "react";
import { useFetchLocations } from "../../hooks/useFetchLocations";

const colorLocations = [
	"bg-yellow-300",
	"bg-red-300",

	"bg-blue-300",
	"bg-indigo-300",
	"bg-purple-300",
	"bg-pink-300",
	"bg-green-300",
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
		<div className="p-1 flex flex-wrap flex-col lg:flex-row gap-2 lg:gap-10">
			{locations?.map((location, index) => (
				<div key={index} className=" flex gap-4 p-2 text-xs items-center rounded-lg ">
					<span className={`p-2 ${colorLocations[location.LocationId]} rounded-lg text-gray-700`}>
						{getLocationCount(location.LocationId)}
					</span>
					<h3>{location.LocationName}</h3>
				</div>
			))}
		</div>
	);
};
