import { React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { UnGroupContainer } from "../Pages/Inventory/UnGroupContainer";
import { Users } from "../Pages/Users/Users";
import { ContainerInPort } from "../Pages/Inventory/ContainerInPort";
import { ReportContainerTransport } from "../Pages/Reports/ReportContainerTransport";
import { useSelector } from "react-redux";
import { ReportSales } from "../Pages/Reports/ReportSales";
import { InvoicesRoutes } from "../InvoicesApp/Routes/InvoicesRoutes";

export const AgencyRoutes = () => {
	const { user } = useSelector((state) => state.Auth);
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="container_port" element={<ContainerInPort />} />
				<Route path="ungroup_container" element={<UnGroupContainer />} />
				{/* <Route path="/invoices/*" element={<InvoicesRoutes />} /> */}
				<Route path="users" element={<Users />} />
				{user.isAdmin && (
					<>
						<Route path="reportContainerTransport" element={<ReportContainerTransport />} />
						<Route path="reportSales" element={<ReportSales />} />
					</>
				)}

				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</Layout>
	);
};
