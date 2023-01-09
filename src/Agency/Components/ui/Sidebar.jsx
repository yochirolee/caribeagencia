import { React } from "react";
import { useSelector } from "react-redux";
import { InventoryDropDownMenu } from "./Dropdowns/InventoryDropDownMenu";
import { OrdersDropDownMenu } from "./Dropdowns/OrdersDropDownMenu";
import { SettingsDropDownMenu } from "./Dropdowns/SettingsDropDownMenu copy";
import { TrackingDropDownMenu } from "./Dropdowns/TrackingDropDownMenu";
export const Sidebar = () => {
	const { toggleSideBar } = useSelector((state) => state.uiSlice);
	const { user } = useSelector((state) => state.Auth);

	return (
		<aside aria-label="Sidebar" className={` lg:block ${toggleSideBar ? "block" : "hidden"}`}>
			<div className="h-screen lg:pointer-events-auto lg:block w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 lg:dark:border-white/10 xl:w-80">
				<div className="border-b pb-4 flex flex-nowrap gap-4  mt-14 mb-8 mx-4">
					<img
						className=" object-cover rounded-full h-10 w-10"
						src="https://www.tailwind-kit.com/images/person/1.jpg"
					></img>
					<div className="flex flex-col  ">
						<span className="text-sm">John Dow</span>
						<span className="text-sm text-slate-600  ">{user?.email}</span>
					</div>
				</div>
				<ul className="space-y-2 mt-4 ">
				
					<InventoryDropDownMenu />
					<TrackingDropDownMenu />
				</ul>
			</div>
		</aside>
	);
};
