import { React } from "react";
export const TrackingByInvoice = () => {

    const getInvoice = async () => {
		try {
			const { data: invoice, status } = await axios.get(
				"https://caribe-cargo-api.vercel.app/api/invoices/" + data.search,
			);
			console.log(invoice.data, "Invoice");
			const HBLS = invoice.data.Items.map((item) => item.HBL);
			console.log(HBLS, "ARRAY HBLS");
			const { data: result, error } = await supabase
				.from("tracking")
				.select("*")
				.in("TrackingId", HBLS);

			console.log(result, "INVOICES SEARCH");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<h1> TrackingByInvoice</h1>
            <p>asdfasdsdafdd</p>
		</>
	);
};
