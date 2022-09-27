import { React } from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { Inicio } from "./Inicio/Inicio";
import { CreateOrders } from "./Orders/CreateOrders";
import { ListOrders } from "./Orders/ListOrders";
export const Dashboard = () => {
	return (
		<DashboardLayout>
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="create_order" element={<CreateOrders />} />
				<Route path="list_orders" element={<ListOrders />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</DashboardLayout>
	);
};
