import { useState } from "react";
import { React } from "react";
import { Link } from "react-router-dom";
export const ContainersDropDownMenu = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<li>
			<div className="text-sm ">
				<div
					onClick={() => setToggle(!toggle)}
					className="flex   items-center p-2  font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<i className="fa fa-file-lines text-blue-500 mr-4"></i>
					<h3>Contenedores</h3>
					<i
						className={`ml-auto text-xs text-blue-500  ${
							toggle ? "fas fa-chevron-down" : "fas fa-chevron-up"
						}`}
					></i>
				</div>

				<Link
					to="/ungroup_container"
					className={`${
						toggle ? "flex" : "hidden"
					} items-center  p-2  pl-5 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700`}
				>
					<i className="fas fa-plus text-gray-500"></i>
					<span className="flex-1 ml-3 whitespace-nowrap">Desagrupar Contenedor</span>
				</Link>
			</div>
		</li>
	);
};
