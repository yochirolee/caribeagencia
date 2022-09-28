import { React } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { db_CreateCustomer } from "../../../Supabase/Customers_db/Customers_db";
import { editRecieverCurrentOrder } from "../../Store/Slices/Orders/OrdersSlice";

export const RecieverForm = ({handleNextStep,handlePrevStep}) => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		//const customer_created = await db_CreateCustomer(data);
		dispatch(editRecieverCurrentOrder(data));
		handleNextStep();
	};

	return (
		<div className="md:w-1/2 mx-auto">
			<h3 className="p-2 m-2 text-center font-bold text-gray-500">Datos del Destinatario:</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="relative">
					<input
						type="text"
						id="reciever_name"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_name", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_name && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_name"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Nombre
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="reciever_last_name"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_last_name", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_last_name && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_last_name"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Apellidos
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="reciever_email"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_email", { pattern: /^\S+@\S+$/i })}
					/>
					{errors.reciever_email && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_email"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Correo Electronico
					</label>
				</div>

				<div className="relative">
					<input
						type="number"
						id="reciever_ci"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_ci", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_ci && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_ci"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Carne de Identidad
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="reciever_passport"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_passport", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_passport && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_passport"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Passaporte
					</label>
				</div>

				<div className="relative">
					<input
						type="number"
						id="reciever_mobile"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_mobile", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_mobile && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_mobile"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Celular
					</label>
				</div>

				<div className="relative">
					<input
						type="number"
						id="reciever_phone"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_phone", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_phone && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="reciever_phone"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Telefono Fijo
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="reciever_address"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("reciever_address", { required: true, maxLength: 80 })}
					/>
					<label
						htmlFor="reciever_address"
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
