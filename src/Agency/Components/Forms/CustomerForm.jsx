import { React } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { db_CreateCustomer } from "../../../Supabase/Customers_db/Customers_db";
import { editOrder, editCustomerCurrentOrder, addOrderTypeToCurrentOrder } from "../../Store/Slices/Orders/OrdersSlice";

export const CustomerForm = ({ handleNextStep }) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		//const customer_created = await db_CreateCustomer(data);
		dispatch(editCustomerCurrentOrder(data));
		dispatch(addOrderTypeToCurrentOrder('Current'))
		handleNextStep();
	};

	console.log(errors);

	return (
		<div className="md:w-1/2 mx-auto">
			<h3 className="p-2 m-2 text-center font-bold text-gray-500">Datos del Cliente:</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="relative">
					<input
						type="text"
						id="customer_name"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("customer_name", { required: true, maxLength: 80 })}
					/>
					{errors.customer_name && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="customer_name"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Nombre
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="customer_last_name"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("customer_last_name", { required: true, maxLength: 80 })}
					/>
					{errors.customer_last_name && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="customer_last_name"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Apellidos
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="customer_email"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("customer_email", { required: true, pattern: /^\S+@\S+$/i })}
					/>
					{errors.customer_email && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="customer_email"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Correo Electronico
					</label>
				</div>

				<select
					{...register("customer_document_type", { required: true })}
					id="customer_document_type"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value="">Tipo de Documento</option>
					<option value="Licencia">Licencia</option>
					<option value="Pasaporte">Pasaporte</option>
					<option value="Carne Identidad">Carne Identidad</option>
				</select>
				{errors.customer_document_type && (
					<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
				)}

				<div className="relative">
					<input
						type="text"
						id="customer_document"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("customer_document", { required: true, maxLength: 80 })}
					/>
					{errors.customer_document && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="customer_document"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Numero de Documento
					</label>
				</div>

				<div className="relative">
					<input
						type="number"
						id="customer_mobile"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("customer_mobile", { required: true, maxLength: 80 })}
					/>
					{errors.customer_mobile && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="customer_document"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Celular
					</label>
				</div>
				<div className="relative">
					<input
						type="text"
						id="customer_address"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("customer_address", { required: true, maxLength: 80 })}
					/>
					<label
						htmlFor="customer_address"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Direccion
					</label>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Continuar
				</button>
			</form>
		</div>
	);
};
