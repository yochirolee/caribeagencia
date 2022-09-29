import { React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { Inicio } from "../Pages/Inicio/Inicio";
import { CreateOrder } from "../Pages/Orders/CreateOrder";
import { ListOrders } from "../Pages/Orders/ListOrders";
import { CreateProduct } from "../Pages/Products/CreateProduct";
export const AgencyRoutes = () => {
	return (
		<DashboardLayout>
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="create_order" element={<CreateOrder />} />
				<Route path="list_orders" element={<ListOrders />} />
				<Route path="create_product" element={<CreateProduct />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</DashboardLayout>
	);
};
