import { React } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InventoryDropDownMenu } from "./Dropdowns/InventoryDropDownMenu";
import { OrdersDropDownMenu } from "./Dropdowns/OrdersDropDownMenu";
import { SettingsDropDownMenu } from "./Dropdowns/SettingsDropDownMenu copy";
import { TrackingDropDownMenu } from "./Dropdowns/TrackingDropDownMenu";
import { UsersDropDownMenu } from "./Dropdowns/UsersDropDownMenu";
import { ReportsDropDownMenu } from "./Dropdowns/ReportsDropDownMenu";

export const Sidebar = () => {
	const { toggleSideBar } = useSelector((state) => state.uiSlice);
	const { user } = useSelector((state) => state.Auth);

	return (
		<aside aria-label="Sidebar" className={` lg:block ${toggleSideBar ? "block" : "hidden"}`}>
			<div className="h-screen lg:pointer-events-auto lg:block w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 lg:dark:border-white/10 xl:w-80">
				<div className="border-b pb-4 flex flex-nowrap gap-4  mt-20 lg:mt-6 mb-8 mx-4">
					<img className=" object-cover rounded-full h-9 w-9 mt-1" src="user.png"></img>
					<div className="flex flex-col  ">
						<span className="text-sm">Bienvenido</span>
						<span className="text-sm text-slate-600  ">{user?.email}</span>
					</div>
				</div>
				<ul className="space-y-2 mt-4 ">
					<li>
						<div className="text-sm ">
							<Link
								to="/"
								className="flex  items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<i className="fa fa-home text-blue-500 mr-4"></i>
								<h3>Inicio</h3>
							</Link>
						</div>
					</li>
					<InventoryDropDownMenu />
					<TrackingDropDownMenu />
					<UsersDropDownMenu />
					<ReportsDropDownMenu />
				</ul>
			</div>
		</aside>
	);
};
