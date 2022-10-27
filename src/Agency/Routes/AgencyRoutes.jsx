import { React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Factura } from "../Components/Pdf/Factura";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { Categories } from "../Pages/Categories/Categories";
import { Customers } from "../Pages/Customers/Customers";
import { Inicio } from "../Pages/Inicio/Inicio";
import { CreateOrder } from "../Pages/Orders/CreateOrder";
import { ListOrders } from "../Pages/Orders/ListOrders";
import { CreateProduct } from "../Pages/Products/CreateProduct";
import { Recievers } from "../Pages/Recievers/Recievers";
import { Tracking } from "../Pages/Tracking/Tracking";
export const AgencyRoutes = () => {
	return (
		<>
			<DashboardLayout>
				<Routes>
					<Route path="/" element={<Inicio />} />
					<Route path="create_order" element={<CreateOrder />} />
					<Route path="list_orders" element={<ListOrders />} />
					<Route path="create_product" element={<CreateProduct />} />
					<Route path="customers" element={<Customers />} />
					<Route path="categories" element={<Categories />} />
					<Route path="recievers" element={<Recievers />} />
					<Route path="tracking" element={<Tracking />} />

					<Route path="factura" element={<Factura />} />
					<Route path="/*" element={<Navigate to="/" />} />
				</Routes>
			</DashboardLayout>
		</>
	);
};
