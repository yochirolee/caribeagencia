import { useQuery } from "react-query";
import axios from "axios";

const getInvoiceById = async (id) => {
	console.log(id, "ID TO SEARCH");
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/invoices/" + id);
	return data;
};

export const useFetchInvoiceById = (id) =>
	useQuery(["fetchInvoiceById", id], () => getInvoiceById(id), {
		enabled: Boolean(id),
	});
