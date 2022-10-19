import { React } from "react";
import { useDispatch } from "react-redux";
import { action_deleteProduct } from "../../../Store/Slices/Products/ProductsActions";
export const ProductListByCategory = ({ products }) => {
	const dispatch = useDispatch();

	const handleDeleteProduct = (id) => {
		dispatch(action_deleteProduct(id));
	};

	return (
		<div className=" text-gray-900 mt-4 overflow-auto bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
			{products?.map((product) => (
				<div
					key={product.ProductId}
					
					className="grid grid-cols-6  gap-4 items-center py-2 px-4 w-full text-sm font-medium cursor-pointer rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
				>
					<div className="col-start-1  col-end-6 grid grid-rows-2  gap-2 ">
						<span>
							{product.ProductName}
							
						</span>
						<div className="grid grid-cols-3 text-xs text-slate-500 ">
							<span>Precio x Lbs: {product.PricePerPound}</span>
							<span>Peso: {product.Weight}</span>
							<span>
								Precio Total:{" "}
								{Math.ceil(product.Weight * product.PricePerPound + product.UnitPrice)}
							</span>
						</div>
					</div>
					<div className=" border-dotted flex justify-end ">
						<i className="fas fa-edit text-green-400 p-2.5  hover:text-green-500 hover:border hover:rounded-full hover:bg-green-200"></i>
						<i
							onClick={() => handleDeleteProduct(product.ProductId)}
							className="fas fa-trash text-red-400 p-2.5  hover:text-red-500 hover:border hover:rounded-full hover:bg-red-200"
						></i>
					</div>
				</div>
			))}
		</div>
	);
};
