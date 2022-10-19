import { React } from "react";
export const ProductListActions = ({ selectedCategory, setShowProductModal }) => {
	return (
		<div className="flex gap-4 p-4 items-center">
			{selectedCategory ? (
				<>
					<h1 className="font-bold text-slate-700">Categoria Seleccionada:</h1>
					<span className="p-2 border bg-gray-600 ring ring-gray-300 text-white rounded-xl text-xs">
						{selectedCategory.CategoryName}
					</span>
					<button
						onClick={() => setShowProductModal(true)}
						className="p-2 border border-blue-500 text-blue-500 rounded-xl text-xs"
					>
						<i className="fas fa-plus mr-2 rounded-full bg-blue-700 p-1 text-white"></i>Crear
						Producto
					</button>
				</>
			) : (
				""
			)}
		</div>
	);
};
