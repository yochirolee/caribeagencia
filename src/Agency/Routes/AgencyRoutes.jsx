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

/*
<Route path="/" element={<Dashboard />} />
				<Route path="new_reciever" element={<AddReciever />} />
				<Route path="create_order" element={<CreateOrder />} />
				<Route path="list_orders" element={<ListOrders />} />
				<Route path="create_product" element={<CreateProduct />} />
				<Route path="customers" element={<Customers />} />
				<Route path="categories" element={<Categories />} />
				<Route path="recievers" element={<Recievers />} />
				<Route path="containers" element={<Containers />} />
				<Route path="fill_container" element={<CreateContainer />} />
				<Route path="ungroup_container" element={<UnGroupContainer />} />
				<Route path="pallets" element={<Pallets />} />
				<Route path="tracking_products" element={<TrackingByProducts />} />
				<Route path="tracking_invoice" element={<TrackingByInvoice />} />
				<Route path="scan_products" element={<ScanQrProducts />} />

				<Route path="factura" element={<Factura />} />
				<Route path="/*" element={<Navigate to="/" />} />
 */

export const AgencyRoutes = () => {
	const { user } = useSelector((state) => state.Auth);
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="container_port" element={<ContainerInPort />} />
				<Route path="ungroup_container" element={<UnGroupContainer />} />
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
