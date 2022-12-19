import axios from "axios";

export const fetchInvoicesById = async (InvoiceId) => {
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/invoices/" + InvoiceId);
	return data;
};
