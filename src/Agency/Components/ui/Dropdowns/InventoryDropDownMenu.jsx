import { useState } from "react";
import { React } from "react";
import { Link } from "react-router-dom";
import { GiHandTruck } from "react-icons/gi";
import { ContainersDropDownMenu } from "./ContainersDropDownMenu";
export const InventoryDropDownMenu = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<li>
			<ContainersDropDownMenu />
			<div className="text-sm ">
				<div
					onClick={() => setToggle(!toggle)}
					className="flex   items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<i className="fas fa-truck-ramp-box text-blue-500 mr-4 "></i>
					<h3>Inventario</h3>
					<i
						className={`ml-auto text-xs text-blue-500  ${
							toggle ? "fas fa-chevron-down" : "fas fa-chevron-up"
						}`}
					></i>
				</div>
				<Link
					to="/containers"
					className={`${
						toggle ? "flex" : "hidden"
					} items-center  p-2  pl-5 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
				>
					<i className="fas fa-cubes text-gray-500"></i>
					<span className="flex-1 ml-3 whitespace-nowrap">Contenedores</span>
				</Link>
				<Link
					to="/pallets"
					className={`${
						toggle ? "flex" : "hidden"
					} items-center  p-2  pl-5 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
				>
					<i className="fas fa-pallet text-gray-500"></i>
					<span className="flex-1 ml-3 whitespace-nowrap">Pallets</span>
				</Link>
			</div>
		</li>
	);
};
