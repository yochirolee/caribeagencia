import { React } from "react";
export const ProductListActions = ({ selectedCategory, setShowProductModal }) => {
	return (
		<div className="flex gap-4 p-4 items-center">
			{selectedCategory ? (
				<div className="flex w-full justify-between ">
					<div className="space-x-4">
						<span className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
							{selectedCategory.CategoryName}
						</span>
						<i className="fa fa-chevron-down  text-gray-400"></i>
					</div>
					<button
						onClick={() => setShowProductModal(true)}
						className="p-2 border border-blue-500 text-blue-500 rounded-xl text-xs"
					>
						<i className="fas fa-plus mr-2 rounded-full bg-blue-700 p-1 text-white"></i>Crear
						Producto
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
};
