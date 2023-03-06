import { React, useMemo } from "react";
import { useFetchLocations } from "../../hooks/useFetchLocations";
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

	const { data: locations, isLoading } = useFetchLocations();

	const getLocationCount = (locationId) => {
		const count = locationCount.find((loc) => locationId == loc.LocationId)?.count;
		return count ? count : 0;
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="p-1 flex flex-wrap flex-col lg:flex-row gap-2 lg:gap-10">
			{locations?.map((location) => (
				<div className="border flex gap-4 p-4 items-center rounded-lg text-sm">
					<span className="p-2 bg-yellow-300 rounded-lg text-yellow-800">
						{getLocationCount(location.LocationId)}
					</span>
					<h3>{location.LocationName}</h3>
				</div>
			))}
		</div>
	);
};
