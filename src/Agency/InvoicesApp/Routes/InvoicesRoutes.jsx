import { Route, Routes } from "react-router-dom";
import { InvoicePage } from "../Pages/InvoicePage";
import { CreateInvoicePage } from "../Pages/createInvoicePage";
import { ListAgenciesPage } from "../Pages/Agencies/ListAgenciesPage";
import { CreateAgencyPage } from "../Pages/Agencies/createAgencyPage";

export const InvoicesRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<InvoicePage />} />
			<Route path="/createInvoice" element={<CreateInvoicePage />} />
			<Route path="/createAgency" element={<CreateAgencyPage />} />
			<Route path="/ListAgencies" element={<ListAgenciesPage />} />
		</Routes>
	);
};
