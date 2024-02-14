import { useQuery } from "react-query";
import axios from "axios";

const getInvoiceById = async (id) => {
	const { data } = await axios.get("https://ctenviosapi.vercel.app/api/tracking/invoice/" + id);
	console.log(data, "data");
	return data;
};

const getProductByHBL = async (id) => {
	const { data } = await axios.get("https://ctenviosapi.vercel.app/api/tracking/hbl/" + id);
	console.log(data, "data");
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
