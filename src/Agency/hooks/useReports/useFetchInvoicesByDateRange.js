import axios from "axios";
import { format, parseISO } from "date-fns";
import { useQuery } from "react-query";

export const getInvoicesByDateRange = async (initialDate, finalDate) => {
	//format date to yyy-MM-dd
	const startDate = format(initialDate, "yyyy-MM-dd");
	const endDate = format(finalDate, "yyyy-MM-dd");
	console.log(startDate, endDate, "RUNNNINNGNGNGNG");
	const { data } = await axios.get("https://caribe-cargo-api.vercel.app/api/invoices/byDateRange", {
		params: { startDate, endDate },
	});
	console.log(data.data, "RUNNNINNGNGNGNG");
	return data.data;
};

export const useFetchInvoicesByDateRange = (initialDate, finalDate) =>
	useQuery(["getInvoicesByDateRange", initialDate], () =>
		getInvoicesByDateRange(initialDate, finalDate),
	);

/*   ["fetchContainerReport", selectedContainer?.ContainerId],
		() => getContainerReport(selectedContainer?.ContainerId),
		{ enabled: !!selectedContainer?.ContainerId }, */
