import { React } from "react";
export const CategoryListActions = ({setShowCategoryModal}) => {
	return (
		<div className="flex justify-between items-center">
			<h1 className="font-bold text-slate-700">Categorias:</h1>
			<button
				onClick={() => setShowCategoryModal(true)}
				className="p-2 border border-blue-500 text-blue-500 rounded-xl text-xs"
			>
				<i className="fas fa-plus text-xs border rounded-full h-6 w-6 bg-blue-600 p-1 text-white "></i>
				<span className="text-blue-700 px-2">Crear Categoria</span>
			</button>
		</div>
	);
};
