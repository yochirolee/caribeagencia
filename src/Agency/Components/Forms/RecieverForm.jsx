import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SelectRecieverForm } from "./SelectRecieverForm";
import {
	action_createReciever,
	action_findRecieverByCustomerId,
} from "../../Store/Slices/Recievers/RecieversActions";

export const RecieverForm = ({ handleNextStep, handlePrevStep }) => {
	const dispatch = useDispatch();
	const { currentOrder } = useSelector((state) => state.OrdersSlice);
	const { reciever, recieversList, customer } = currentOrder;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		dispatch(action_findRecieverByCustomerId(customer.CustomerId));
	}, []);

	useEffect(() => {
		reset(reciever);
	}, [reciever]);

	const onSubmit = async (data) => {
		if (customer) {
			data.CustomerId = customer.CustomerId;
			dispatch(action_createReciever(data));
			handleNextStep();
		}
	};

	return (
		<div className="md:w-1/2 mx-auto">
			{recieversList?.length ? <SelectRecieverForm /> : ""}

			<h3 className="p-2 m-2 text-center font-bold text-gray-500">Datos del Destinatario:</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="relative">
					<input
						type="text"
						id="FirstName"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("FirstName", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_name && (
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
						id="Email"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Email", { pattern: /^\S+@\S+$/i })}
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
						id="CI"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("CI", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_ci && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="CI"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Carne de Identidad
					</label>
				</div>

				<div className="relative">
					<input
						type="text"
						id="Passport"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Passport", { required: true, maxLength: 80 })}
					/>
					{errors.Passport && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="Passport"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Passaporte
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
					{errors.reciever_mobile && (
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
						type="number"
						id="Phone"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						{...register("Phone", { required: true, maxLength: 80 })}
					/>
					{errors.reciever_phone && (
						<span className="text-red-400  text-xs pl-2">Este campo es requerido</span>
					)}
					<label
						htmlFor="Phone"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Telefono Fijo
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
