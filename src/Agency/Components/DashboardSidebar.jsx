import { React } from "react";
import { Sidebar } from "flowbite-react";
import {
	HiHome,
	HiUser,
	HiPencil,
	HiShoppingBag,
	HiChartPie,
	HiInbox,
	HiArrowSmRight,
	HiTable,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export const DashboardSidebar = () => {
	return (
		<div className="h-screen  hidden lg:block shadow-lg relative w-80">
			<div className="bg-white h-full dark:bg-gray-700">
				<div className="flex items-center justify-start pt-6 ml-8">
					<p className="font-bold dark:text-white text-xl">Caribe Agencia</p>
				</div>
				<nav className="mt-4 ">
					<Sidebar aria-label="Sidebar with multi-level dropdown example">
						<Sidebar.Items>
							<Sidebar.ItemGroup>
								<div className="flex flex-col ">
									<Link to="/" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
										Inicio
									</Link>
									<Sidebar.Collapse icon={HiShoppingBag} label="Ordenes">
										<div className="flex flex-col ">
											<Link to="create_order" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Crear Orden
											</Link>
											<Link to="list_orders" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Listado de Ordenes
											</Link>
										</div>
										<Sidebar.Item href="#">Listado de Paquetes</Sidebar.Item>
										<Sidebar.Item href="#">Historia de Ordenes</Sidebar.Item>
									</Sidebar.Collapse>
									<Sidebar.Item href="#" icon={HiInbox}>
										Inbox
									</Sidebar.Item>
									<Sidebar.Item href="#" icon={HiUser}>
										Users
									</Sidebar.Item>
									<Sidebar.Item href="#" icon={HiShoppingBag}>
										Products
									</Sidebar.Item>
									<Sidebar.Item href="#" icon={HiArrowSmRight}>
										Sign In
									</Sidebar.Item>
									<Sidebar.Item href="#" icon={HiTable}>
										Sign Up
									</Sidebar.Item>
								</div>
							</Sidebar.ItemGroup>
						</Sidebar.Items>
					</Sidebar>
				</nav>
			</div>
		</div>
	);
};
