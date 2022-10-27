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
	HiOutlineUsers,
	HiOutlineClipboardList,
} from "react-icons/hi";
import { TbReportSearch } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToggleMainMenu } from "../Store/Slices/Ui/uiSlice";

export const DashboardSidebar = () => {
	const { toggleMainMenu } = useSelector((state) => state.uiSlice);
	const dispatch = useDispatch();
	return (
		<div
			className={` ${
				toggleMainMenu ? "" : "hidden"
			} h-screen   lg:block z-20 md:relative shadow-lg absolute w-80`}
		>
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
										<div className="flex flex-col ml-4 ">
											<Link
												to="create_order"
												className=" pl-10 rounded-lg hover:bg-gray-100 p-2"
												onClick={() => dispatch(setToggleMainMenu())}
											>
												Crear Orden
											</Link>
											<Link to="list_orders" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Listado de Ordenes
											</Link>
										</div>
									</Sidebar.Collapse>

									<Sidebar.Collapse icon={BsBoxSeam} label="Productos">
										<div className="flex flex-col ml-4 ">
											<Link to="categories" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Categorias
											</Link>
											<Link to="create_product" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Productos
											</Link>
										</div>
									</Sidebar.Collapse>
									<Sidebar.Collapse icon={HiOutlineUsers} label="Clientes">
										<div className="flex flex-col ">
											<Link to="customers" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Listado de Clientes
											</Link>
										</div>
									</Sidebar.Collapse>
									<Sidebar.Collapse  icon={TbReportSearch} label="Tracking">
										<div className="flex flex-col ">
											<Link to="tracking" className=" pl-10 rounded-lg hover:bg-gray-100 p-2">
												Tracking
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
