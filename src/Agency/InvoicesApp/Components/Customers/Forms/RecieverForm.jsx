import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InvoiceStore } from "../../../Store/InvoiceStore";

const postReciever = async (reciever) => {
	if (!reciever) throw new Error("Por Favor ingrese los datos");
	const res = await fetch(`http://localhost:3001/api/v1/reciever/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(reciever),
	});

	if (!res.ok) throw new Error("Ups Algo salio mal");

	const data = await res.json();
	console.log(data);
	return data;
};

const getStates = async () => {
	const res = await fetch("http://localhost:3001/api/v1/states");
	const data = await res.json();
	console.log(data, "Getting States");
	return data;
};

const useFetchStates = () => {
	return useQuery(["fetchStates"], () => getStates());
};

export default function RecieverForm({ setIsOpen }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const queryClient = useQueryClient();
	const { data: states } = useFetchStates();
	const recieverMutation = useMutation({
		mutationFn: (newReciever) => postReciever(newReciever),
		onSuccess: () => {
			console.log(recieverMutation.data, "reciever mutation data");

			queryClient.invalidateQueries("getCustomers");
			setIsOpen(false);
		},
	});

	/* 	function validarCarnetIdentidad(carnet) {
		if (!/^\d{2}([0]?[0-9]|[1]?[0-2])([0-2]?[0-9]|[3]?[0-1])\d{5}$/.test(carnet)) {
			console.log("not valid");
			return false;
		}

		// Luego, calculamos el dígito de control utilizando el algoritmo de verificación de códigos numéricos
		var suma = 0;
		var pesos = [2, 9, 8, 7, 6, 3, 4, 1, 1, 0];
		for (var i = 0; i < 10; i++) {
			var digito = parseInt(carnet.charAt(i), 10);
			suma += digito * pesos[i];
		}

		var residuo = suma % 11;
		var digitoControl = residuo === 0 ? 0 : 11 - residuo;

		console.log(parseInt(carnet.charAt(10), 10) === digitoControl, "verificacion");
		// Finalmente, verificamos que el dígito de control coincida con el último dígito del carnet
		return parseInt(carnet.charAt(10), 10) === digitoControl;
	} */

	const onSubmit = async (data) => {
		data.agencyId = 1;
		data.countryId = 1;
		data.stateId = 1;
		data.cityId = 1;
		data.passport = "asdfasdf";
		data.license = "asdfasdf";

		const createdReciever = await recieverMutation.mutateAsync(data);
		InvoiceStore.setState({ invoice: { reciever: createdReciever } });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{recieverMutation.isError ? (
				<div className="text-bold text-red-500">Something Wrong</div>
			) : (
				""
			)}
			<div className=" ">
				<div className="border-b border-gray-900/10 pb-12">
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="ci" className="block text-sm font-medium leading-6 text-gray-900">
								Carne de Identidad
							</label>
							<div className="mt-2">
								<input
									{...register("ci", {
										pattern: !/^\d{2}([0]?[0-9]|[1]?[0-2])([0-2]?[0-9]|[3]?[0-1])\d{5}$/,
									})}
									type="text"
									name="ci"
									id="ci"
									maxLength={11}
									autoComplete="carne"
									placeholder="00000000000"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.ci && <p className="text-xs text-red-500 ">{"Wrong Number"}</p>}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Pasaporte
							</label>
							<div className="mt-2">
								<input
									{...register("passport", { pattern: /^[A-Z]{1}[0-9]{6}$/i })}
									type="text"
									name="passport"
									id="passport"
									autoComplete="passport"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.passport && (
									<p className="text-xs text-red-500 ">Verifique el No de Pasaporte</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Nombre
							</label>
							<div className="mt-2">
								<input
									{...register("firstName", { required: "El Nombre es Requerido" })}
									type="text"
									name="firstName"
									id="firstName"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.firstName && (
									<p className="text-xs text-red-500 ">{errors.firstName?.message}</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Apellidos
							</label>
							<div className="mt-2">
								<input
									{...register("lastName", { required: "El Apellido es Requerido" })}
									type="text"
									name="lastName"
									id="lastName"
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.lastName && (
									<p className="text-xs text-red-500 ">{errors.lastName?.message}</p>
								)}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Telefono Movil
							</label>
							<div className="mt-2">
								<input
									{...register("mobile", { required: "El Movil es Requerido" })}
									type="tel"
									name="mobile"
									id="mobile"
									placeholder="999-999-9999"
									autoComplete="given-mobile"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.mobile && <p className="text-xs text-red-500 ">{errors.mobile?.message}</p>}
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Telefono Fijo
							</label>
							<div className="mt-2">
								<input
									{...register("phone")}
									type="tel"
									name="phone"
									id="phone"
									placeholder="999-999-9999"
									autoComplete="given-phone"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-4">
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Correo Electronico
							</label>
							<div className="mt-2">
								<input
									{...register("email", { required: "El Email es Requerido" })}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.email && <p className="text-xs text-red-500 ">{errors.email?.message}</p>}
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="street-address"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Direccion
							</label>
							<div className="mt-2">
								<input
									{...register("address", { required: "La Direccion es Requerida" })}
									type="text"
									name="address"
									id="address"
									autoComplete="address"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<div className="mt-2">
									{errors.address && (
										<p className="text-xs text-red-500 ">{errors.address?.message}</p>
									)}
								</div>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="no" className="block text-sm font-medium leading-6 text-gray-900">
								Numero
							</label>
							<div className="mt-2">
								<input
									{...register("no")}
									type="text"
									name="no"
									id="no"
									autoComplete="no"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="apto" className="block text-sm font-medium leading-6 text-gray-900">
								Apartamento
							</label>
							<div className="mt-2">
								<input
									{...register("apto")}
									type="text"
									name="apto"
									id="apto"
									autoComplete="apto"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="zone" className="block text-sm font-medium leading-6 text-gray-900">
								Reparto
							</label>
							<div className="mt-2">
								<input
									{...register("zone")}
									type="text"
									name="zone"
									id="apto"
									autoComplete="zone"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Provincia
							</label>
							<div className="mt-2">
								<select
									id="state"
									name="state"
									autoComplete="state-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option>Seleccione una Provincia</option>
									{states?.map((state) => (
										<option key={state.id}>{state.name}</option>
									))}
								</select>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Municipio
							</label>
							<div className="mt-2">
								<select
									id="city"
									name="city"
									autoComplete="city-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									{states && states[0]?.cities?.map((city) => (
										<option key={city?.id}>{city?.name}</option>
									))}
								</select>
							</div>
						</div>

						<div className="sm:col-span-3 sm:col-start-1">
							<label
								htmlFor="postal-code"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									{...register("postalCode", { required: "El Codigo Postal es Requerido" })}
									type="text"
									name="postalCode"
									id="postalCode"
									autoComplete="postalCode"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="mt-2">
								{errors.postalCode && (
									<p className="text-xs text-red-500 ">{errors.postalCode?.message}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					onClick={() => setIsOpen(false)}
					type="button"
					className="text-sm font-semibold leading-6 text-gray-900"
				>
					Cancel
				</button>

				<button
					type="submit"
					disabled={recieverMutation.isLoading}
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					{recieverMutation.isLoading ? "Guardando" : "Save"}
				</button>
			</div>
		</form>
	);
}
