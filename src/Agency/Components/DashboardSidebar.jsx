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
	HiOutlineClipboardList,
} from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
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
									<Sidebar.Collapse icon={HiOutlineClipboardList} label="Ordenes">
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

									<Sidebar.Collapse icon={BsBoxSeam} label="Productos">
										<div className="flex flex-col ">
											<Link to="create_product" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Crear Producto
											</Link>
											<Link to="list_product" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Listado de Productos
											</Link>
										</div>
									</Sidebar.Collapse>
								</div>
							</Sidebar.ItemGroup>
						</Sidebar.Items>
					</Sidebar>
				</nav>
			</div>
		</div>
	);
};
