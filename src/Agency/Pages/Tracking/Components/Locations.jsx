import { React } from "react";

export const Locations = ({ setLocation, setShowModal }) => {
	const handleSelection = (e) => {
		setLocation(e.target.value);
		setShowModal(true);
	};
	return (
		<div className="flex flex-col container ">
			<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
				Seleccione Ubicacion:
			</h3>

			<div className="flex flex-col md:flex-row gap-4 mb-4">
				<button
					onClick={(e) => handleSelection(e)}
					type="button"
					value="En Almacen"
					className=" items-center  px-5 py-2.5 text-sm font-medium text-center text-blue-600 border border-blue-400  rounded-lg focus:text-white focus:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:first-letter:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Almacen
					<span class="inline-flex justify-center items-center ml-2 px-1 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
						200
					</span>
				</button>
				<button
					onClick={(e) => handleSelection(e)}
					type="button"
					value="Contenedor"
					className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-blue-600 border border-blue-400  rounded-lg focus:text-white focus:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:first-letter:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Contenedor
					<span class="inline-flex justify-center items-center ml-2 px-1 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
						200
					</span>
				</button>
				<button
					onClick={(e) => handleSelection(e)}
					type="button"
					value="Transportando"
					className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-blue-600 border border-blue-400  rounded-lg focus:text-white focus:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:first-letter:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Transportando
					<span class="inline-flex justify-center items-center ml-2 px-1 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
						200
					</span>
				</button>
				<button
					onClick={(e) => handleSelection(e)}
					type="button"
					value="Entregado"
					className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-blue-600 border border-blue-400  rounded-lg focus:text-white focus:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:first-letter:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Entregado
					<span class="inline-flex justify-center items-center ml-2 px-1 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
						200
					</span>
				</button>
			</div>
		</div>
	);
};
