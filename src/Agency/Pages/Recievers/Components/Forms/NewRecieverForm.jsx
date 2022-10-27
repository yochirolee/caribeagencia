import { React, useDeferredValue, useEffect, useInsertionEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCities } from "../../../../hooks/useGetCities";
import { useGetStates } from "../../../../hooks/useGetStates";

export const NewRecieverForm = () => {
	const { states, selectedState, setSelectedState, isLoadingStates } = useGetStates();
	const { cities, selectedCity, setSelectedCity, isLoadingCities } = useGetCities(
		selectedState.StateId,
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => console.log(data);

	console.log(errors);

	const handleSelectedStateChange = (e) => {
		setSelectedState(states.find((st) => st.StateId == e.target.value));
	};

	const handleSelectedCity = (e) => {
		setSelectedCity(cities.find((city) => city.CityId == e.target.value));
	};

	return (
		<form className="lg:px-40 " onSubmit={handleSubmit(onSubmit)}>
			<div className="grid gap-6 mb-6 md:grid-cols-2">
				<div className="pb-4">
					<label
						htmlFor="CI"
						className="block mb-2 text-sm font-medium  text-gray-900 dark:text-gray-300"
					>
						Carne de Identidad
					</label>
					<input
						type="number"
						id="CI"
						{...register("CI", {
							required: true,
							valueAsNumber: true,

							pattern: /^\d{2}([0]?[0-9]|[1]?[0-2])([0-2]?[0-9]|[3]?[0-1])\d{5}$/i,
						})}
						className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
					{errors.CI && <span>This field is required</span>}
				</div>
				<div>
					<label
						htmlFor="Passport"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Pasaporte
					</label>
					<input
						type="text"
						id="Passport"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
				<div>
					<label
						htmlFor="Mobile"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Movil
					</label>
					<input
						type="number"
						id="Mobile"
						className="bg-gray-50 border appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
				<div>
					<label
						htmlFor="Phone"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Telefono Fijo
					</label>
					<input
						type="number"
						id="Phone"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
			</div>
			<div className="grid gap-6  mb-6 md:grid-cols-2">
				<div>
					<label
						htmlFor="FirstName"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Primer Nombre
					</label>
					<input
						type="text"
						id="FirstName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
				<div>
					<label
						htmlFor="SecondName"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Segundo Nombre
					</label>
					<input
						type="text"
						id="SecondName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
				<div>
					<label
						htmlFor="SecondName"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Primer Apellido
					</label>
					<input
						type="text"
						id="LastName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
				<div>
					<label
						htmlFor="SecondLastName"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Segundo Apellido
					</label>
					<input
						type="text"
						id="SecondLastName"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder=""
						required=""
					/>
				</div>
			</div>
			<div className="my-6">
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Correo Electronico
				</label>
				<input
					type="email"
					id="Email"
					{...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder=""
					required=""
				/>
			</div>
			<div className="bg-gray-100 p-4 border rounded-lg">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
					Provincia
				</label>
				<select
					onChange={(e) => handleSelectedStateChange(e)}
					className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					{isLoadingStates ? (
						<option>Loading...</option>
					) : (
						states?.map((st) => (
							<option key={st.StateId} value={st.StateId}>
								{st.StateName}
							</option>
						))
					)}
				</select>
				<label className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
					Municipio
				</label>
				<select
					onChange={(e) => handleSelectedCity(e)}
					className=" mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					{isLoadingCities ? (
						<option>Loading...</option>
					) : (
						cities?.map((city) => (
							<option key={city.CityId} value={city.CityId}>
								{city.CityName}
							</option>
						))
					)}
				</select>
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label
							htmlFor="Avenue"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Avenida, Calle:
						</label>
						<input
							type="text"
							id="Avenue"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder=""
							required=""
						/>
					</div>
					<div>
						<label
							htmlFor="Street"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Entre Calles:
						</label>
						<input
							type="text"
							id="Street"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder=""
							required=""
						/>
					</div>

					<div className="grid grid-cols-3 gap-6">
						<div>
							<label
								htmlFor="Apto"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								No.
							</label>
							<input
								type="number"
								id="Apartamento"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder=""
								required=""
							/>
						</div>
						<div>
							<label
								htmlFor="Apto"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Apartamento
							</label>
							<input
								type="number"
								id="Apartamento"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder=""
								required=""
							/>
						</div>
						<div>
							<label
								htmlFor="Zip"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Zip
							</label>
							<input
								type="number"
								id="Apartamento"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder=""
								required=""
								defaultValue={selectedCity?.Zip}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="SecondName"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Reparto
						</label>
						<input
							type="text"
							id="Reparto"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder=""
							required=""
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-end m-4">
				<button
					type="submit"
					className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					<div role="status">
						<svg
							aria-hidden="true"
							className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							></path>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							></path>
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
					Crear Destinatario
				</button>
			</div>
		</form>
	);
};
