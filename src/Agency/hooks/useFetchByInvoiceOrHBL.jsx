import { useQuery } from "react-query";
import axios from "axios";

const getInvoiceById = async (id) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/invoices/" + id);
	
	return data;
};

const getProductByHBL = async (id) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/products/" + id);
	return data;
};

export const useFetchByInvoiceOrHBL = (id) => {
	if (id && id.length > 7) {
		return useQuery(["fetchProductByHBL", id], () => getProductByHBL(id), {
			enabled: Boolean(id),
		});
	} else {
		return useQuery(["fetchInvoiceById", id], () => getInvoiceById(id), {
			enabled: Boolean(id),
		});
	}
};
