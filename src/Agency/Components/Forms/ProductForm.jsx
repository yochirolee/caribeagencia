import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { addProductToCurrentOrder } from "../../Store/Slices/Orders/OrdersSlice";
import { HiOutlineArrowRight } from "react-icons/hi";
import { action_getCategories } from "../../Store/Slices/Categories/CategoriesActions";
import { action_getProductsByCategory } from "../../Store/Slices/Products/ProductsActions";
import { ProductListByCategory } from "../../Pages/Categories/ProductListByCategory/ProductListByCategory";
import { ListProductsInOrder } from "../../Pages/Orders/ListProductsInOrder/ListProductsInOrder";

export const ProductForm = ({ handleNextStep }) => {
	const dispatch = useDispatch();
	const { currentOrder } = useSelector((state) => state.OrdersSlice);
	const { categories } = useSelector((state) => state.CategoriesSlice);
	const { products } = useSelector((state) => state.ProductsSlice);
	const [selectedCategory, setSelectedCategory] = useState("");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		dispatch(action_getCategories());
		console.log("geting categories use effect");
	}, []);

	useEffect(() => {
		if (selectedCategory.length !== "") dispatch(action_getProductsByCategory(selectedCategory));
	}, [selectedCategory]);

	const onSubmit = async (data) => {
		dispatch(addProductToCurrentOrder(data));
		console.log("reset");
		reset({ Weight: 0, QuantityPerUnit: 1, PricePerPound: 0 });
		setSelectedCategory("");
		console.log(selectedCategory, "selectedCategory");
		console.log("reset done");
	};

	const handleContinue = () => {
		handleNextStep();
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		setSelectedCategory(e.target.value);
	};

	const handleProductChange = (e) => {
		e.preventDefault();
		const productId = e.target.value;
		const prod = products.find((p) => p.ProductId == parseInt(productId));
		console.log("reset With Data");
		reset(prod);
	};

	return (
		<div className=" flex flex-col lg:grid  gap-10">
			<div className="flex flex-col  border-r p-4 md:h-screen overflow-y-auto bg-gray-50">
				<h3 className="pb-2">Datos de Producto</h3>

				<div className="flex flex-col gap-4 mb-4 ">
					<select
						id="CategoryId"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						onChange={(e) => handleCategoryChange(e)}
					>
						<option value="">Seleccione</option>
						{categories.map((category) => (
							<option key={category.CategoryId} value={category.CategoryId}>
								{category.CategoryName}
							</option>
						))}
					</select>

					<select
						id="ProductName"
						onChange={(e) => handleProductChange(e)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="">Nombre del Producto</option>
						{products?.map((product) => (
							<option key={product.ProductId} value={product.ProductId}>
								{product.ProductName}
							</option>
						))}
					</select>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-4">
						<div className="relative">
							<input
								type="number"
								id="QuantityPerUnit"
								min={1}
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								{...register("Quantity", { required: true, maxLength: 80 })}
							/>
							{errors.product_quantity && (
								<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
							)}
							<label
								htmlFor="QuantityPerUnit"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								Cantidad
							</label>
						</div>
						<div className="relative">
							<input
								step=".01"
								min={0}
								type="number"
								id="Weight"
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								{...register("Weight", { required: true, maxLength: 80 })}
							/>
							{errors.Weight && (
								<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
							)}
							<label
								htmlFor="Weight"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								Peso (Lbs)
							</label>
						</div>
						<div className="relative">
							<input
								step=".01"
								min={0}
								type="number"
								id="PricePerPound"
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								{...register("PricePerPound", { required: true, maxLength: 80 })}
							/>
							{errors.Weight && (
								<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
							)}
							<label
								htmlFor="PricePerPound"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								Precio x Lb
							</label>
						</div>
						<div className="relative">
							<textarea
								id="Description"
								className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
								placeholder=" "
								{...register("Description")}
							/>
							{errors.Description && (
								<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
							)}
							<label
								htmlFor="Description"
								className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
							>
								Descripcion
							</label>
						</div>
						<div className="flex justify-end">
							<Button type="submit" color="warning">
								Adicionar Producto
								<HiOutlineArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</div>
					</div>
				</form>
			</div>
			<div className=" col-start-2 col-end-6">
				<div className="flex justify-between  ">
					<h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
						Lista de Productos en la Orden:
					</h3>
				</div>
				<div id="products-list ">
					<ListProductsInOrder products={currentOrder.products} />
				</div>
				<div className="flex justify-end border-t my-2 p-2 border-dashed">
					<Button disabled={currentOrder.products?.length == 0} onClick={handleContinue}>
						Continuar
					</Button>
				</div>
			</div>
		</div>
	);
};
