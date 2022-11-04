import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../Layout/Layout";
import {
	action_DeleteCategory,
	action_getCategories,
} from "../../Store/Slices/Categories/CategoriesActions";
import { setSelectedCategory } from "../../Store/Slices/Categories/CategoriesSlice";
import { action_getProductsByCategory } from "../../Store/Slices/Products/ProductsActions";
import { CategoryList } from "./CategoryList/CategoryList";
import { CategoryListActions } from "./CategoryList/CategoryListActions";
import { AddCategoriesModal } from "./Modals/AddCategoryModal";
import { AddProductModal } from "./Modals/AddProductModal";
import { ProductListActions } from "./ProductListByCategory/ProductListActions";
import { ProductListByCategory } from "./ProductListByCategory/ProductListByCategory";

export const Categories = () => {
	const dispatch = useDispatch();
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [showProductModal, setShowProductModal] = useState(false);
	const { categories, selectedCategory, isLoading } = useSelector((state) => state.CategoriesSlice);
	const { products } = useSelector((state) => state.ProductsSlice);

	useEffect(() => {
		dispatch(action_getCategories());
		dispatch(action_getProductsByCategory(selectedCategory.CategoryId));
	}, [selectedCategory]);

	const handleDeleteCategory = (id) => {
		dispatch(action_DeleteCategory(id));
	};

	const handleSelectedCategory = (category) => {
		dispatch(setSelectedCategory(category));
	};

	return (
		<Layout>
			<div className="grid lg:grid-cols-8 xl:grid-cols-10 gap-10">
				<div className="col-span-3  flex flex-col  border-r p-4 lg:h-screen overflow-y-auto bg-gray-50">
					<div className="p-4 rounded-xl bg-white my-4">
						<label
							htmlFor="services"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
						>
							Seleccione Servicio
						</label>
						<select
							id="service"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option defaultValue="">Seleccione Servicio</option>
							<option value="US">Transcargo</option>
						</select>
						<div className="flex flex-col justify-center py-4 ">
							<p className="mx-auto"></p>
							<button className="p-2 border bg-green-500 text-white rounded-xl text-xs">
								Crear Servicio
							</button>
						</div>
					</div>
					<CategoryListActions setShowCategoryModal={setShowCategoryModal} />
					<CategoryList
						categories={categories}
						handleSelectedCategory={handleSelectedCategory}
						handleDeleteCategory={handleDeleteCategory}
					/>
				</div>
				<div className="col-start-4 col-span-full">
					<ProductListActions
						selectedCategory={selectedCategory}
						setShowProductModal={setShowProductModal}
					/>
					{selectedCategory ? (
						<ProductListByCategory products={products} setShowProductModal={setShowProductModal} />
					) : (
						<div
							class="flex p-4 mb-4 items-center space-x-4 text-sm text-yellow-600 bg-orange-100 rounded-lg dark:bg-red-200 dark:text-yellow-800"
							role="alert"
						>
							<i className="fa  fa-exclamation-circle text-yellow-400"></i>
							<div>
								<span class="font-medium">Por Favor!</span> Seleccione una Categoria o Servicio
							</div>
						</div>
					)}
				</div>
				<AddCategoriesModal
					showCategoryModal={showCategoryModal}
					setShowCategoryModal={setShowCategoryModal}
				/>
				<AddProductModal
					showProductModal={showProductModal}
					setShowProductModal={setShowProductModal}
				/>
			</div>
		</Layout>
	);
};
