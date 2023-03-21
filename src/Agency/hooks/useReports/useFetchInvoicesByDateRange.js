import axios from "axios";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";

export const getInvoicesByDateRange = async (initialDate, finalDate) => {
	if (finalDate == null) finalDate = initialDate;
	const startDate = format(initialDate, "yyyy-MM-dd");
	const endDate = format(finalDate, "yyyy-MM-dd");
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/invoices/byDateRange", {
		params: { startDate, endDate },
	});
	return data.data;
};

export const useFetchInvoicesByDateRange = (initialDate, finalDate) =>
	useQuery(["getInvoicesByDateRange", initialDate], () =>
		getInvoicesByDateRange(initialDate, finalDate),
	);
