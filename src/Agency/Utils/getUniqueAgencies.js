export const getUniqueAgencies = (productList) => {
	if (!productList) return [];
	const uniqueAgencies = [
		...new Set(
			productList?.map((product) => (product.Agency ? product.Agency : product.AgencyName)),
		),
	];
	return uniqueAgencies;
};
