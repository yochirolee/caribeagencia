import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	editCustomerCurrentOrder,
	addOrderTypeToCurrentOrder,
} from "../../Store/Slices/Orders/OrdersSlice";
import { setCurrentCustomer } from "../../Store/Slices/Customers/CustomersSlices";

export const CustomerForm = ({ handleNextStep }) => {
	const { currentCustomer, isLoading } = useSelector((state) => state.CustomersSlice);
	
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		reset(currentCustomer);
	}, [currentCustomer]);

	const onSubmit = async (data) => {
		dispatch(setCurrentCustomer(data));
		dispatch(editCustomerCurrentOrder(currentCustomer));
		dispatch(addOrderTypeToCurrentOrder("Current"));
		handleNextStep();
	};

	return (
		<div className="md:w-1/2 mx-auto">
			<h3 className="p-2 m-2 text-center font-bold text-gray-500">Datos del Cliente:</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="relative">
					<input
						type="text"
						id="FirstName"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("FirstName", { required: true, maxLength: 80 })}
					/>
					{errors.FirstName && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="FirstName"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Nombre
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="LastName"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("LastName", { required: true, maxLength: 80 })}
					/>
					{errors.LastName && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="LastName"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Apellidos
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="Email"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
					/>
					{errors.Email && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="Email"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Correo Electronico
					</label>
				</div>

				<select
					{...register("DocumentType", { required: true })}
					id="DocumentType"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value="">Tipo de Documento</option>
					<option value="Licencia">Licencia</option>
					<option value="Pasaporte">Pasaporte</option>
					<option value="Carne Identidad">Carne Identidad</option>
				</select>
				{errors.DocumentType && (
					<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
				)}

				<div className="relative">
					<input
						type="text"
						id="Document"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Document", { required: true, maxLength: 80 })}
					/>
					{errors.Document && (
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
						id="Mobile"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Mobile", { required: true, maxLength: 80 })}
					/>
					{errors.Mobile && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="Mobile"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Celular
					</label>
				</div>
				<div className="relative">
					<input
						type="text"
						id="Address"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Address", { required: true, maxLength: 80 })}
					/>
					<label
						htmlFor="Address"
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
