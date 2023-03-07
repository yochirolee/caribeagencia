export const getUniqueLocations = (filteredProducts) => {
	if (!filteredProducts) return [];
	const uniqueLocations = [
		...new Set(filteredProducts.map((product) => product.locations.LocationName)),
	];
	return uniqueLocations;
};
