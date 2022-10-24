import { Button } from "flowbite-react";
import { React } from "react";
export const ProductSearch = ({ setIsVisible }) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 justify-between items-center py-4 bg-white dark:bg-gray-800">
			<label htmlFor="table-search" className="sr-only">
				Buscar
			</label>

			<div className="relative">
				<div className="flex  absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
				<i className="fa fa-search text-gray-500"></i>
				</div>
				<input
					type="text"
					id="table-search-users"
					className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Buscar Producto"
				></input>{" "}
			</div>
			<div className="mr-4">
				<Button onClick={() => setIsVisible(true)}>Crear Producto</Button>
			</div>
		</div>
	);
};
