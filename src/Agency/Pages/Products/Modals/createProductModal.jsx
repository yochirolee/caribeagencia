import { Button } from "flowbite-react";
import { React } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { db_CreateProduct } from "../../../../Supabase/Products_db/Products_db";
import { productThunks_createProduct } from "../../../Store/Slices/Products/ProductsThunks";

export const CreateProductModal = ({ isVisible, setIsVisible }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(productThunks_createProduct(data));
		setIsVisible(false);
		reset();
	};
	return (
		<div
			id="editUserModal"
			tabIndex="-1"
			aria-hidden="true"
			className={`${
				isVisible ? "" : "hidden"
			} overflow-y-auto bg-gray-500/50 grid  overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full`}
		>
			<div className="relative w-full max-w-2xl h-full md:h-auto">
				{/*-- Modal content */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="relative bg-white rounded-lg shadow dark:bg-gray-700"
				>
					<div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Producto</h3>
						<button
							onClick={() => setIsVisible(false)}
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-toggle="editUserModal"
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>

					<div className="p-6 space-y-6">
						<div className="grid grid-cols-6 gap-6">
							<div className="col-span-6 sm:col-span-3">
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
								{errors.product_type && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
							</div>
							<div className="col-span-6 sm:col-span-3">
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
										Nombre del Producto
									</label>
								</div>
							</div>
							<div className="col-span-6 sm:col-span-3">
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
							</div>
							<div className="col-span-6 sm:col-span-3">
								<div className="relative">
									<input
										type="text"
										id="product_price"
										className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" "
										{...register("product_price", { required: true, maxLength: 80 })}
									/>
									{errors.product_weight && (
										<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
									)}
									<label
										htmlFor="product_price"
										className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
									>
										Precio de Venta
									</label>
								</div>
							</div>
							<div className="col-span-6 sm:col-span-3">
								<div className="relative">
									<input
										type="text"
										id="product_cost"
										className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" "
										{...register("product_cost", { required: true, maxLength: 80 })}
									/>
									{errors.product_weight && (
										<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
									)}
									<label
										htmlFor="product_cost"
										className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
									>
										Precio de Costo
									</label>
								</div>
							</div>
							<div className="col-span-6 sm:col-span-3">
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
							</div>
							<div className="col-span-6 sm:col-span-3">
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
							</div>
							<div className="col-span-6 sm:col-span-3">
								<div className="flex items-center">
									<input
										id="checked-checkbox"
										type="checkbox"
										value=""
										className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										{...register("isActive")}
									/>

									<label
										htmlFor="checked-checkbox"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Activo
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Crear Producto
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
