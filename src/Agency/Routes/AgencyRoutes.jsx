import { React } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Factura } from "../Components/Pdf/Factura";
import { Layout } from "../Layout/Layout";
import { AddReciever } from "../Pages/AddReciever";
import { Categories } from "../Pages/Categories/Categories";
import { Customers } from "../Pages/Customers/Customers";
import { Dashboard } from "../Pages/Dashboard";
import { CreateOrder } from "../Pages/Orders/CreateOrder";
import { ListOrders } from "../Pages/Orders/ListOrders";
import { CreateProduct } from "../Pages/Products/CreateProduct";
import { Recievers } from "../Pages/Recievers/Recievers";
import { ScanQrProducts } from "../Pages/Tracking/ScanQrProducts";
import { TrackingByProducts } from "../Pages/Tracking/TrackingByProducts";
import { TrackingByInvoice } from "../Pages/Tracking/TrackingByInvoice";
import { Containers } from "../Pages/Contenedores/Containers";
import { Pallets } from "../Pages/Pallets/Pallets";
import { CreateContainer } from "../Pages/Contenedores/CreateContainer";
import { UnGroupContainer } from "../Pages/Inventory/UnGroupContainer";
import { Users } from "../Pages/Users/Users";
import { NationalizeProducts } from "../Pages/Inventory/NationalizeProducts";
import { AlertPopup } from "../Components/Alert/AlertPopup";
import { InDelivery } from "../Pages/Inventory/InDelivery";
import { DeliveryDone } from "../Pages/Inventory/DeliveryDone";
import { ContainerInPort } from "../Pages/Inventory/ContainerInPort";

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
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="tracking_products" element={<TrackingByProducts />} />
				<Route path="container_port" element={<ContainerInPort />} />
				<Route path="ungroup_container" element={<UnGroupContainer />} />
				<Route path="nacionalize" element={<NationalizeProducts />} />
				<Route path="in_delivery" element={<InDelivery />} />
				<Route path="done_delivery" element={<DeliveryDone />} />
				<Route path="users" element={<Users />} />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</Layout>
	);
};
