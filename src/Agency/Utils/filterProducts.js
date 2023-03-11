export const filterProducts = (productList, selectedAgency, selectedLocation) => {
	let filteredByAgency = selectedAgency
		? productList?.filter((product) => product.AgencyName == selectedAgency)
		: productList;

	let filteredByLocation = selectedLocation
		? filteredByAgency?.filter((product) => product.locations.LocationName == selectedLocation)
		: filteredByAgency;
	return filteredByLocation ? filteredByLocation : filteredByAgency;
};
