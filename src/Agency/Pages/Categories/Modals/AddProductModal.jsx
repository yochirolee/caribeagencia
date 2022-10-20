import { React } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { action_createProduct } from "../../../Store/Slices/Products/ProductsActions";

export const AddProductModal = ({ setShowProductModal, showProductModal }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { selectedCategory } = useSelector((state) => state.CategoriesSlice);
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		data.CategoryId = selectedCategory.CategoryId;
		console.log(data);
		dispatch(action_createProduct(data));
		setShowProductModal(false);
		reset();
	};
	return (
		<div
			id="addProductModal"
			tabIndex="-1"
			aria-hidden="true"
			className={`${
				showProductModal ? "md:grid " : "hidden"
			} overflow-y-auto bg-gray-500/50   overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center p-4 w-full md:inset-0 h-modal md:h-full`}
		>
			<div className="relative w-screen max-w-2xl h-full md:h-auto">
				{/*-- Modal content */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="relative bg-white rounded-lg shadow dark:bg-gray-700"
				>
					<div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">Nuevo Producto</h3>
						<button
							onClick={() => setShowProductModal(false)}
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
						<div className="col-span-6 sm:col-span-3">
							<div className="relative">Categoria: {selectedCategory.CategoryName}</div>
						</div>
					</div>
					<div className="p-6 space-y-6">
						<div className="col-span-6 sm:col-span-3">
							<div className="relative">
								<input
									type="text"
									id="ProductName"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("ProductName", { required: true, maxLength: 80 })}
								/>
								{errors.ProductName && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="ProductName"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Nombre del Producto:
								</label>
							</div>
						</div>
						<div className="col-span-6 sm:col-span-3">
							<div className="relative">
								<input
									type="number"
									id="Weight"
									step=".01"
									min={0}
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
						</div>
						<div className="col-span-6 sm:col-span-3">
							<div className="relative">
								<input
									type="number"
									id="PricePerPound"
									step=".01"
									min={0}
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("PricePerPound", { required: true, maxLength: 80 })}
								/>
								{errors.PricePerPound && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="PricePerPound"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Precio x (Lbs)
								</label>
							</div>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<div className="relative">
								<input
									type="number"
									id="QuantityPerUnit"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("QuantityPerUnit", { required: true, maxLength: 80 })}
								/>
								{errors.QuantityPerUnit && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="QuantityPerUnit"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Cantidad
								</label>
							</div>
						</div>
						<div className="col-span-6 sm:col-span-3">
							<div className="relative">
								<input
									type="number"
									id="UnitPrice"
									step=".01"
									min={0}
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
									{...register("UnitPrice", { required: true, maxLength: 80 })}
								/>
								{errors.UnitPrice && (
									<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
								)}
								<label
									htmlFor="UnitPrice"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
								>
									Precio
								</label>
							</div>
						</div>
					</div>
					<div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-auto focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Crear Producto
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
