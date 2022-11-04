import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OrdersDropDownMenu } from "./OrdersDropDownMenu";
import { SettingsDropDownMenu } from "./SettingsDropDownMenu copy";
import {  TrackingDropDownMenu } from "./TrackingDropDownMenu";
export const Sidebar = () => {
	const [toggle, setToggle] = useState(true);
	const { user } = useSelector((state) => state.UserSlice);

	return (
		<aside aria-label="Sidebar" className="hidden lg:block">
			<div className="overflow-y-auto px-8  w-72   h-screen bg-gray-50 rounded dark:bg-gray-800">
				<div className="border-b pb-4 flex flex-nowrap gap-4  mt-20 mb-8 mx-4">
					<img
						className=" object-cover rounded-full h-10 w-10"
						src="https://www.tailwind-kit.com/images/person/1.jpg"
					></img>
					<div className="flex flex-col  ">
						<span className="text-sm">John Dow</span>
						<span className="text-sm text-slate-600  ">{user.email}</span>
					</div>
				</div>
				<ul className="space-y-2 mt-4 ">
					<OrdersDropDownMenu />
					<SettingsDropDownMenu />
					<TrackingDropDownMenu />
				</ul>
			</div>
		</aside>
	);
};
