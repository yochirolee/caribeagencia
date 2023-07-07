import { useQuery } from "react-query";
import axios from "axios";

export const findProductsByHBL = async (productListToSearch) => {
	const config = {
		"Content-Type": "application/json",
		Accept: "application/json",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		},
	};

	try {
		const result = await axios.post(
			"https://caribe-cargo-api.vercel.app/api/products/",
			productListToSearch,
			config,
		);

		return result.data.data;
	} catch (error) {
		console.log("ERRRORRRRRRRRRR FECHING PRODUCT FROM API/PROCUTS");
		throw new Error(error.message);
	}
};

export const findProductsByInvoices = async (invoicesListToSearch) => {
	const config = {
		"Content-Type": "application/json",
		Accept: "application/json",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		},
	};

	try {
		const result = await axios.post(
			"https://caribe-cargo-api.vercel.app/api/products/findInvoices",
			invoicesListToSearch,
			config,
		);
		return result.data;
	} catch (error) {
		console.log("ERRRORRRRRRRRRR FECHING PRODUCT FROM API/PROCUTS");
		throw new Error(error.message);
	}
};

export const useFetchProductsList = (productListToSearch) => {
	if (!productListToSearch) return [];

	let { data, isLoading, isError } = useQuery(
		["searchProducts", productListToSearch],

		() =>
			productListToSearch[0]?.HBL
				? findProductsByHBL(productListToSearch)
				: findProductsByInvoices(productListToSearch),

		{ enabled: !!productListToSearch },
	);
	if (Array.isArray(data)) return { data, isLoading, isError };
	else {
		data = [];
	}
	return { data, isLoading, isError };
};
