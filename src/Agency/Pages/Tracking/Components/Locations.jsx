import { React } from "react";

export const Locations = ({ setLocation, setShowModal }) => {
	const handleSelection = (e) => {
		setLocation(e.target.value);
		setShowModal(true);
	};
	return (
		<div>
			<div>
				<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
					Seleccione Ubicacion:
				</h3>
			</div>

			<ul className="grid gap-6 w-full md:grid-cols-6">
				<li>
					<input
						type="radio"
						id="hosting-small-1"
						name="hosting"
						value="En Almacen"
						className="hidden peer"
						onClick={(e) => handleSelection(e)}
					/>
					<label
						htmlFor="hosting-small-1"
						className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div className="block">
							<div className="w-full">En Almacen</div>
						</div>
						<i className="fas fa-plus"></i>
					</label>
				</li>
				<li>
					<input
						type="radio"
						id="hosting-small"
						name="hosting"
						value="En Contenedor"
						className="hidden peer"
						onClick={(e) => handleSelection(e)}
					/>
					<label
						htmlFor="hosting-small"
						className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div className="block">
							<div className="w-full">En Contenedor</div>
						</div>
						<i className="fas fa-plus"></i>
					</label>
				</li>
				<li>
					<input
						type="radio"
						id="hosting-big"
						name="hosting"
						className="hidden peer"
						value="Transportandose"
						onClick={(e) => handleSelection(e)}
					/>
					<label
						htmlFor="hosting-big"
						className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div className="block">
							<div className="w-full">Transportandose</div>
						</div>
						<i className="fas fa-plus"></i>
					</label>
				</li>
				<li>
					<input
						type="radio"
						id="hosting-small-2"
						name="hosting"
						className="hidden peer"
						value="Entregado"
						onClick={(e) => handleSelection(e)}
					/>
					<label
						htmlFor="hosting-small-2"
						className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div className="block">
							<div className="w-full">Entregado</div>
						</div>
						<i className="fas fa-plus"></i>
					</label>
				</li>
			</ul>
		</div>
	);
};
