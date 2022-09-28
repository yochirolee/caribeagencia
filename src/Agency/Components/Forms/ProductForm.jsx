import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { addProduct } from "../../Store/Slices/ProductSlice";
import { addProductsToCurrentOrder } from "../../Store/Slices/Orders/OrdersSlice";
import { HiOutlineArrowRight } from "react-icons/hi";

export const ProductForm = ({ handleNextStep }) => {
	const dispatch = useDispatch();
	const { productList } = useSelector((state) => state.ProductSlice);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		//const customer_created = await db_CreateCustomer(data);
		console.log(data, "Product form data");
		data.productId = productList.length;

		dispatch(addProduct(data));

		reset();
	};

	const handleContinue = () => {
		dispatch(addProductsToCurrentOrder(productList));
		handleNextStep();
	};

	return (
		<div>
			<div className="flex  flex-row-reverse gap-4  justify-around">
				<div className="md: w-2/3">
					<h3 className="pb-2">Productos Adicionados</h3>
					<p>{productList.length} Cant</p>
					<div id="products-list">
						{productList?.map((product) => (
							<div
								id="product-card"
								className="flex px-2 mb-2 items-center  border rounded-lg justify-between "
							>
								<div className="flex  flex-grow text-xs px-4  justify-between gap-4 ">
									<div className="text-center">
										<small>Tipo de Producto</small>
										<p>{product.product_type}</p>
									</div>
									<div className="text-center">
										<small>Producto</small>
										<p>{product.product_name}</p>
									</div>
									<div className="text-center">
										<small>Peso (Lbs)</small>
										<p>{product.product_weight}</p>
									</div>
									<div className="text-center">
										<small>Cant</small>
										<p>{product.product_quantity}</p>
									</div>
									<div className="text-center">
										<small>Descripcion</small>
										<p>{product.product_description}</p>
									</div>
								</div>

								<div id="product-actions" className="flex border-l px-4 gap-4">
									<i className="fas fa-edit"></i>
									<i className="fas fa-trash"></i>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="md:w-1/3">
					<h3 className="pb-2">Datos de Producto</h3>
					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<div className="flex flex-col gap-4">
							<select
								{...register("product_type", { required: true })}
								id="product_type"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							>
								<option value="">Tipo de Producto</option>
								<option value="Producto">Producto</option>
								<option value="Producto Online">Producto Online</option>
								<option value="Miscelaneas">Miscelaneas</option>
								<option value="Medicamentos">Medicamentos</option>
							</select>
							{errors.customer_document_type && (
								<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
							)}
							<div className="relative">
								<input
									type="text"
									id="product_name"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("product_name", { required: true, maxLength: 80 })}
								/>
								{errors.product_name && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="product_name"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Producto
								</label>
							</div>
							<div className="relative">
								<input
									type="number"
									id="product_quantity"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("product_quantity", { required: true, maxLength: 80 })}
								/>
								{errors.product_quantity && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="product_quantity"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Cantidad
								</label>
							</div>
							<div className="relative">
								<input
									type="number"
									id="product_weight"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("product_weight", { required: true, maxLength: 80 })}
								/>
								{errors.product_weight && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="product_weight"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Peso (Lbs)
								</label>
							</div>
							<div className="relative">
								<textarea
									id="product_description"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("product_description")}
								/>
								{errors.product_description && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="product_description"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Descripcion
								</label>
							</div>
							<div className="flex justify-end">
								<Button type="submit" color="gray">
									Adicionar Producto
									<HiOutlineArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="flex justify-end border-t my-2 p-2 border-dashed">
				<Button disabled={productList.length == 0} onClick={handleContinue}>
					Continuar
				</Button>
			</div>
		</div>
	);
};
