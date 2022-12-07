import { React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Factura } from "../Components/Pdf/Factura";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { Layout } from "../Layout/Layout";
import { AddReciever } from "../Pages/AddReciever";
import { Categories } from "../Pages/Categories/Categories";
import { Customers } from "../Pages/Customers/Customers";
import { Dashboard } from "../Pages/Dashboard";
import { Inicio } from "../Pages/Inicio/Inicio";
import { CreateOrder } from "../Pages/Orders/CreateOrder";
import { ListOrders } from "../Pages/Orders/ListOrders";
import { CreateProduct } from "../Pages/Products/CreateProduct";
import { Recievers } from "../Pages/Recievers/Recievers";
import { Tracking } from "../Pages/Tracking/Tracking";
import { Items } from "../Pages/Tracking/Items";
import { TrackingByInvoice } from "../Pages/Tracking/TrackingByInvoice";

export const AgencyRoutes = () => {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="new_reciever" element={<AddReciever />} />
				<Route path="create_order" element={<CreateOrder />} />
				<Route path="list_orders" element={<ListOrders />} />
				<Route path="create_product" element={<CreateProduct />} />
				<Route path="customers" element={<Customers />} />
				<Route path="categories" element={<Categories />} />
				<Route path="recievers" element={<Recievers />} />
				<Route path="tracking" element={<Tracking />} />
				<Route path="items" element={<Items />} />
				<Route path="tracking_invoice" element={<TrackingByInvoice />} />

				<Route path="factura" element={<Factura />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</Layout>
	);
};
